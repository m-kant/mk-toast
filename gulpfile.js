const gulp = require('gulp');
const { srcFolder } = require('./build/config.js');

require('./build/clean.gulp.js');
require('./build/copy.gulp.js');
require('./build/scss.gulp.js');
require('./build/rollup.gulp.js');
require('./build/sync-server.gulp.js');

gulp.task('watch', function () {
  gulp.watch([srcFolder + '*.ts'], gulp.parallel('rollup'));
  gulp.watch([srcFolder + '*.scss'], gulp.parallel('skin'));
});

gulp.task('build', gulp.parallel('copy', 'rollup', 'skin'));
gulp.task('serve', gulp.series('clean', 'build', gulp.parallel('watch', 'sync-server')));

gulp.task('default', gulp.series('clean', 'build'));
