const fsp = require('fs').promises;
const ghpages = require('gh-pages');

const { task, dest, src, series, parallel } = require('gulp');
const ts = require('gulp-typescript');

const webpackStream = require('webpack-stream');
const webpackCompiler = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createWebpackConfig = require('./webpack.config.js');

task('clean', async () => fsp.rmdir('./build', { recursive: true }));

const libraryTypes = ['commonjs', 'umd', 'amd'];
libraryTypes.forEach(v => {
  task(`build:lib:js:${v}`, () => {
    const webpackConfig = createWebpackConfig(false, v);
    return src('./lib/index.tsx')
      .pipe(webpackStream(webpackConfig, webpackCompiler))
      .pipe(dest('build'));
  });
});

task('build:lib:js', series(...libraryTypes.map(v => `build:lib:js:${v}`)));

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

task('build:docs:js', () => {
  const webpackConfig = createWebpackConfig(true);
  return src('./docs/index.tsx')
    .pipe(webpackStream(webpackConfig, webpackCompiler))
    .pipe(dest('build/docs'));
});

task('build:docs', series('clean', 'build:docs:js'));

task('start:docs', () => {
  const devServerConfig = {
    hot: true,
    inline: true,
    publicPath: '/',
    contentBase: false,
    historyApiFallback: true
  };
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
  new WebpackDevServer(webpackCompiler(webpackConfig), devServerConfig).listen(
    8080
  );
});

task('pages:publish', async () => {
  fs.writeFileSync(
    './build/docs/404.html',
    fs.readFileSync('./build/docs/index.html')
  );
  ghpages.publish('./build/docs', e => console.log(e));
});

task('pages', series(task('build:docs'), task('pages:publish')));
