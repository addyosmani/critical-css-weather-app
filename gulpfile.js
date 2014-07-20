// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');
var critical = require('critical'); // new
var rename = require('gulp-rename'); // new
var ngAnnotate = require('gulp-ng-annotate'); // new
var clean = require('gulp-clean'); // new
var del = require('del'); // new
var runSequence = require('run-sequence');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('copy-html-files', function () {
  return gulp.src(['./app/**/*.html', './app/owm-cities.json', '!./app/index.html'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('copy-font-files', function () {
  return gulp.src(['./app/bower_components/font-awesome/fonts/*.*'])
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('usemin', function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      js: [ngAnnotate(), uglify()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/'
  });
});

// Default Task
gulp.task('default', ['connect']);

gulp.task('build', ['clean'], function () {
  runSequence('copy-html-files', 'copy-font-files', 'usemin');
});

// Critical-path CSS
gulp.task('copystyles', function () {
    return gulp.src('./build/assets/combined.css')
        .pipe(rename({
            basename: "site" // site.css
        }))
        .pipe(gulp.dest('./build/assets/'));
});

gulp.task('criticalcss', function (cb) {
    critical.generateInline({
        base: './build/',
        src: 'index.html',
        styleTarget: './assets/combined.css',
        htmlTarget: 'index.html',
        width: 960,
        height: 600,
        minify: true
    }, cb.bind(cb));
});

gulp.task('critical', ['clean'], function () {
  runSequence('build', 'copystyles', function(){
    // Note this is a temporary hack. 
    setTimeout(function(){
      gulp.start('criticalcss');
    }, 5000);
  });
});
// end critical-path css
