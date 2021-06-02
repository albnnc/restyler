const isLib = process.env.SECTION === 'lib';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead'
      }
    ],
    '@babel/preset-react',
    ...(isLib ? [] : ['@emotion/babel-preset-css-prop'])
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { isTSX: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining'
  ]
};
