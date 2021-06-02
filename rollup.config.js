import fs from 'fs';
import path from 'path';
import process from 'process';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';

import babelConfig from './babel.config';
import html from './rollup.plugin-html';

const isLib = process.env.SECTION === 'lib';
const isProduction = process.env.NODE_ENV === 'production';
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];

export default {
  input: isLib ? './lib/index.tsx' : './docs/index.tsx',

  output: isLib
    ? [
        { file: './build/index.js', format: 'es' },
        { file: './build/index.min.js', format: 'es', plugins: [terser()] },
        { file: './build/index.cjs', format: 'cjs' },
        { file: './build/index.min.cjs', format: 'cjs', plugins: [terser()] }
      ]
    : {
        dir: './build/docs',
        format: 'iife'
      },

  plugins: [
    nodeResolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: ['node_modules', process.cwd()]
      }
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      ...babelConfig
    }),
    replace(
      Object.entries(process.env).reduce(
        (prev, [k, v]) => ({
          ...prev,
          [`process.env.${k}`]: JSON.stringify(v)
        }),
        {}
      )
    ),
    image(),
    ...(!isLib
      ? [
          html(),
          {
            name: 'string',
            resolveId(source, importer) {
              if (source.endsWith('?raw')) {
                return path.resolve(path.dirname(importer), source);
              }
            },
            load(id) {
              if (id.endsWith('?raw')) {
                const path = id.replace('?raw', '');
                const data = fs.readFileSync(path).toString();
                return `export default ${JSON.stringify(data)}`;
              }
            }
          }
        ]
      : []),
    ...(!isLib && !isProduction
      ? [
          serve({
            contentBase: './build/docs',
            historyApiFallback: true,
            historyApiFallback: '/index.html',
            host: 'localhost',
            port: 4200
          }),
          livereload()
        ]
      : [])
  ],

  external: isLib ? ['react', 'react-dom'] : [],

  onwarn: (warning, rollupWarn) => {
    if (!['CIRCULAR_DEPENDENCY', 'THIS_IS_UNDEFINED'].includes(warning.code)) {
      rollupWarn(warning);
    }
  }
};
