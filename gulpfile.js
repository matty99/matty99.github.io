'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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
    .pipe(imagemin({
      optimizationLevel: 7,
      multipass: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
  	.pipe(gulp.dest('images'));
});
