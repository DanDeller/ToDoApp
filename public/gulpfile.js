var gulp = require('gulp'),
     less = require('gulp-less'),
     minifycss = require('gulp-minify-css'),
     connect   = require("gulp-connect"),
     concat    = require('gulp-concat'),
     del       = require('del'),
     less      = require('gulp-less'),
     watch     = require('gulp-watch'),
     notify    = require('gulp-notify');

// handle our less files
gulp.task('css', function(){
  return gulp.src([
      'assets/css/**/*.less'
    ])
    .pipe(less())
    .pipe(minifycss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// handle out js files
gulp.task('scripts', function() {
  return gulp.src([
      'app.js',
      'assets/js/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/mainJS'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// watch all our files
gulp.task('watch', function() {
  gulp.watch('assets/css/**/*.less', ['css']);
  gulp.watch([
      'app.js',
      'assets/js/**/*.js',
    ],['scripts']);
});


gulp.task("default", ['css', 'scripts', 'watch'], function() {
  // start it up and get watching
});