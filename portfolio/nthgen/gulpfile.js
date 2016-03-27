'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('less', function() {
  gulp.src('./styles/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./styles/css'));
});

gulp.task('images', function () {
  return gulp.src('images/*')
    .pipe(imagemin({
      optimizationLevel: 7,
      multipass: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('images'));
});
