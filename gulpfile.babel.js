import { promises as fsp } from 'fs';
import ghpages from 'gh-pages';
import execa from 'execa';
import { argv } from 'yargs';

import { task, dest, src, series, watch } from 'gulp';
import ts from 'gulp-typescript';

import * as rollup from 'rollup';
import rollupConfig from './rollup.config.js';

task('clean', async () => fsp.rmdir('./build', { recursive: true }));

task('build:lib:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup.rollup(input);
  const outputs = Array.isArray(output) ? output : [output];
  for (let v of outputs) {
    await bundle.write(v);
  }
});

task('build:lib:types', () => {
  return src('./lib/**/*.tsx')
    .pipe(
      ts({
        ...require('./tsconfig.json').compilerOptions,
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: true
      })
    )
    .pipe(dest('build'));
});

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));

task('start:lib', () => {
  watch(['lib/**/*'], series('build:lib:js', 'build:lib:types'));
});

task('build:docs:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup.rollup(input);
  await bundle.write(output);
});

task('build:docs', series('clean', 'build:docs:js'));

task('start:docs', () => {
  const watcher = rollup.watch({ ...rollupConfig });
  watcher.on('event', event => {
    console.log(`[ROLLUP] ${event?.error ?? event.code}`);
  });
});

task('pages:publish', async () => {
  await fsp.writeFile(
    './build/docs/404.html',
    await fsp.readFile('./build/docs/index.html')
  );
  ghpages.publish('./build/docs', e => e && console.log(e));
});

task('pages', series(task('build:docs'), task('pages:publish')));

task('release:git', async () => {
  const version = argv['release-version'];
  if (!version) {
    throw new Error(
      'Specify version: `npm run release -- --release-version <version>`'
    );
  }
  const options = { stdout: 'inherit' };
  await execa.command(`git flow release start ${version}`, options);
  await execa.command(`npm version --no-git-tag-version ${version}`, options);
  await execa.command(`git commit -am ${version}`, options);
  await execa.command(
    `git flow release finish ${version} -m ${version}`,
    options
  );
  await execa.command(`git push origin develop`, options);
  await execa.command(`git push origin master`, options);
  await execa.command(`git push origin ${version}`, options);
});

task('release:npm', async () => {
  const options = { stdout: 'inherit' };
  await execa.command(`npm publish`, options);
});

task('release', series('release:git', 'build:lib', 'release:npm'));
