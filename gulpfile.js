
const gulp		= require('gulp');
const del		= require('del');
 
const uglify	= require('gulp-uglify');
const concat	= require('gulp-concat');
const babel		= require('gulp-babel');
const addsrc	= require('gulp-add-src');
const rename	= require("gulp-rename");
const less		= require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const cleanCSS	= require('gulp-clean-css');


gulp.task('clean', () => del(['./dist/*']) );

gulp.task('less', () =>
	gulp.src('src/mk-toast.less')
		.pipe(less({plugins: [autoprefix]}))
		.pipe(gulp.dest('./dist'))
		.pipe(cleanCSS())
		.pipe(rename('mk-toast.min.css'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('build-es6', () =>
    gulp.src(['src/mk-toast.js','src/inc/footer.es6.js'])
		.pipe(concat('mk-toast.es6.js'))
		.pipe(gulp.dest('dist'))
);

// this widget is only for browser no exports for node required
gulp.task('build-es5', () =>
    gulp.src(['src/mk-toast.js'])
        .pipe(babel({
            presets: ['env']
        }))
		.pipe(addsrc('src/inc/footer.es5.js'))
		.pipe(concat('mk-toast.js'))
        .pipe(gulp.dest('dist'))
		.pipe(uglify())
        .pipe(rename('mk-toast.min.js'))
        .pipe(gulp.dest('dist'))
);

gulp.task('build', gulp.series( 'clean', gulp.parallel('build-es5', 'build-es6', 'less')) );
