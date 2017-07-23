/// <binding BeforeBuild='styles' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('styles', function () {
    gulp.src('Content/**/*.min.css')
        .pipe(cleanCSS())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./wwwroot/'));
});