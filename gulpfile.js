'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pngcrush = require('imagemin-pngcrush');

gulp.task('sass', function () {
  gulp.src('./styles/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/sass/*.scss', ['sass']);
});

gulp.task('images', function () {
  return gulp.src('images/**/*.png')
    .pipe(pngcrush({reduce: true})())
	.pipe(gulp.dest('images'));
});