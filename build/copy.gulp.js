const gulp = require('gulp');
const { srcFolder, distFolder } = require('./config.js');

/** Copy files to dist */
gulp.task('copy', function () {
  return gulp.src(
    [srcFolder + 'types.d.ts'],
    { base: srcFolder }
  ).pipe(gulp.dest(distFolder));
});
