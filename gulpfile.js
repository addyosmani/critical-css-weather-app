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

gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', './app/owm-cities.json', '!./app/index.html'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('copy-font-files', function() {
  gulp.src(['./app/bower_components/font-awesome/fonts/*.*'])
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      js: [ngAnnotate(), uglify()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});

// Critical-path CSS
gulp.task('copystyles', function () {
    return gulp.src(['build/_assets/combined.css'])
        .pipe(rename({
            basename: "site" // site.css
        }))
        .pipe(gulp.dest('build/_assets/'));
});

gulp.task('critical', ['build', 'copystyles'], function () {
    critical.generateInline({
        base: 'build/',
        src: 'index.html',
        styleTarget: '_assets/combined.css',
        htmlTarget: 'index.html',
        width: 960,
        height: 600,
        minify: true
    });
});
// end critical-path css

// Default Task
gulp.task('default', ['connect']);
gulp.task('build', ['copy-html-files', 'copy-font-files', 'usemin']);
