/** Для того, чтобы это корректно работало надо билдить с флажком -m=dev */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { distFolder } = require('./config.js');

gulp.task('sync-server', function () {
  // Static server
  browserSync.init({
    server: { baseDir: '.' },
    // proxy: 'http://localhost',
  });
  // reload browser on dist/files change
  gulp.watch([distFolder + '*.*', 'demo/*.*']).on('change', browserSync.reload);
});

// for CSS-inject in styles task
module.exports = browserSync;
