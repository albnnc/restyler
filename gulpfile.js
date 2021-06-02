const { task, dest, src, series } = require('gulp');
const fs = require('fs');
const ghpages = require('gh-pages');

const webpackStream = require('webpack-stream');
const webpackCompiler = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createWebpackConfig = require('./webpack.config.js');

task('build:lib', () => {
  fs.rmdirSync('./build', { recursive: true });
  const webpackConfig = createWebpackConfig(false);
  return src('./lib/index.tsx')
    .pipe(webpackStream(webpackConfig, webpackCompiler))
    .pipe(dest('build'));
});

task('build:docs', () => {
  fs.rmdirSync('./build', { recursive: true });
  const webpackConfig = createWebpackConfig(true);
  return src('./docs/index.tsx')
    .pipe(webpackStream(webpackConfig, webpackCompiler))
    .pipe(dest('build/docs'));
});

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
