/** SCSS styles */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const noop = require('gulp-noop');
const sourcemaps = require("gulp-sourcemaps");
// const browserSync = require('./sync-server.gulp');

const { srcFolder, distFolder, IS_DEV, IS_PROD } = require("./config.js");


gulp.task('skin', function () {
    const cssOptions = {
      compatibility: "ie8",
      rebase: false // don't try to rebuild relative background urls
    };

    return gulp
        .src([
            srcFolder + "*.scss"
        ])
        .pipe(IS_DEV ? sourcemaps.init() : noop())
        .pipe(sass().on("error", sass.logError))
        .pipe(prefix())
        .pipe(IS_PROD ? cleanCSS(cssOptions) : noop())
        .pipe(IS_DEV ? sourcemaps.write() : noop())
        .pipe(gulp.dest(distFolder))
        // .pipe(IS_DEV ? browserSync.stream() : noop()); // inject CSS without reloading
});



