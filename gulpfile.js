'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('images', function () {
  return gulp.src(['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'])
    .pipe(imagemin({
      optimizationLevel: 7,
      multipass: true,
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false,
        },
      ],
      use: [pngquant()],
    }))
    .pipe(gulp.dest('.'));
});
