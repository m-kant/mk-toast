const gulp = require('gulp');
const del = require('del');
const { distFolder } = require('./config.js');

/** Clean target directory */
gulp.task('clean', function () {
  return del([distFolder + '*']);
});
