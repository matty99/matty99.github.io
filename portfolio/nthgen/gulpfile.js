'use strict';
 
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('./styles/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./styles/css'));
});