'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var trioConcat = require('./build/trioConcat.js');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// Watch Files For Changes
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch([
        'node_modules/trio/dist/trio.min.js',
        'client/**/*.*'
        ], ['build']);
});

gulp.task('build', function() {
    return gulp.src([
            'node_modules/trio/dist/trio.min.js',
            'client/**/*.*'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('trio-concat', function() {
    return gulp.src('client/src/app.js')
        .pipe(trioConcat())
        .pipe(gulp.dest('dist/src'));
});