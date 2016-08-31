// requires

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var minify_css = require('gulp-minify-css');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var browser_sync = require('browser-sync').create();

// variables

var dest_css = 'public/assets/css';
var src_sass = 'public/assets/sass/*.sass';
var src_html = 'public/*.html';
var src_js = 'public/assets/js/*.js'

// Sass to Css

gulp.task('sass', function(){
	return gulp.src(src_sass)
		.pipe(plumber())
		.pipe(sass())
        .pipe(prefix({
            browsers: ['last 3 versions']
        }))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(dest_css))
		.pipe(browser_sync.reload({stream: true}))
});




gulp.task('watch', function(){
	browser_sync.init({
		server: 'public/'
	})
	gulp.watch(src_sass, ['sass'])
	gulp.watch(src_html).on('change', browser_sync.reload)
	gulp.watch(src_js).on('change', browser_sync.reload)
})

gulp.task('default', ['watch', 'sass']);