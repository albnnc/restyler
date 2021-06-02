import { promises as fsp } from 'fs';
import ghpages from 'gh-pages';
import execa from 'execa';
import { argv } from 'yargs';
import ts from 'gulp-typescript';
import { dest, series, src, task, watch } from 'gulp';
import * as rollup from 'rollup';
import rollupConfig from './rollup.config.js';

const execaOptions = { stdout: 'inherit' };

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
  await execa.command(
    'build-storybook -c storybook -o build/docs',
    execaOptions
  );
});

task('build:docs', series('clean', 'build:docs:js'));

task('start:docs', async () => {
  await execa.command(
    'start-storybook -c storybook -p 6006 --ci',
    execaOptions
  );
});

task('lint', async () => {
  await execa.command(
    'npx eslint ./{src,storybook}/**/*.{js,jsx,ts,tsx} --fix',
    execaOptions
  );
  await execa.command(
    'npx prettier ./{src,storybook}/**/*.{js,jsx,ts,tsx} --write',
    execaOptions
  );
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
  await execa.command(`git flow release start ${version}`, execaOptions);
  await execa.command(
    `npm version --no-git-tag-version ${version}`,
    execaOptions
  );
  await execa.command(`git commit -am ${version}`, execaOptions);
  await execa.command(
    `git flow release finish ${version} -m ${version}`,
    execaOptions
  );
  await execa.command(`git push origin develop`, execaOptions);
  await execa.command(`git push origin master`, execaOptions);
  await execa.command(`git push origin ${version}`, execaOptions);
});

task('release:npm', async () => {
  await execa.command(`npm publish`, execaOptions);
});

task('release', series('release:git', 'build:lib', 'release:npm'));
