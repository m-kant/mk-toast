const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript'); // tslib must be installed
const terser = require('rollup-plugin-terser').terser;
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const babel = require('@rollup/plugin-babel').babel ;
const { srcFolder, distFolder, IS_DEV, IS_PROD } = require('./config.js');

/** Bundle library with Rollup.js (https://rollupjs.org/) */
gulp.task('rollup', async function () {
  const bundle = await rollup.rollup({
    input: srcFolder + 'mk-toast.ts',
    plugins: [
      resolve(),
      typescript({
        target: 'esnext',
        sourceMap: IS_DEV,
      }),
      babel({ babelHelpers: 'bundled', extensions: [".ts"] }),
    ],
  });

  await bundle.write({
    // dir: distFolder,
    file: distFolder + 'mk-toast.js',
    format: 'umd',
    name: 'mktoast',
    banner: '/** For use in bundlers/browsers in a form of UMD */',
    sourcemap: IS_DEV ? 'inline' : false,
  });
  if (IS_PROD) {
    // minified for browser
    await bundle.write({
      file: distFolder + 'mk-toast.min.js',
      format: 'iife',
      name: 'mktoast',
      banner: '/** For use in browsers in a form of self-executing function (IIFE) */',
      sourcemap: false,
      plugins: [terser()], // will remove banner
    });
  }
});
