const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../lib/**/*.stories.mdx', '../lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource'
  ],
  core: {
    builder: 'webpack5'
  },
  // https://github.com/styleguidist/react-docgen-typescript/issues/356
  typescript: {
    reactDocgen: 'none'
  },
  webpackFinal: async config => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin(),
      ...(config.resolve.plugins ?? [])
    ];
    return config;
  }
};
