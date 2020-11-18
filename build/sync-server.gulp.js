/** Для того, чтобы это корректно работало надо билдить с флажком -m=dev */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { distFolder } = require('./config.js');

// Static server
gulp.task('sync-server', function () {
  browserSync.init({
    server: { baseDir: '.' },
    // proxy: 'http://localhost',
  });
  gulp.watch([distFolder + '*.*', 'demo/*.*']).on('change', browserSync.reload);
});

// for CSS inject in styles task
module.exports = browserSync;
