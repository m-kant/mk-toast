/**
 *
 * -m buildMode # prod | dev
 * -p uploadSubPath
 */

const argv = require('minimist')(process.argv.slice(2));

const mode = argv['m'] || 'prod';
const uploadPath = argv['p'] || '';

const IS_PROD = mode === 'prod';
const IS_DEV = !IS_PROD;

module.exports = {
  srcFolder: './src/',
  distFolder: './dist/',
  libName: 'mktoast',
  IS_DEV,
  IS_PROD,
  uploadPath,
};

console.log(`mode is ${IS_DEV ?'DEVELOPMENT' : 'PRODUCTION'}`);
