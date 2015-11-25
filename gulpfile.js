'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('watch', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// gulp.task('nodemon', function (cb) {
//     var started = false;
//     return nodemon({
//         script: 'server/index.js'
//     }).on('start', function () {
//         // to avoid nodemon being started multiple times
//         // thanks @matthisk
//         if (!started) {
//             cb();
//             started = true; 
//         } 
//     });
// });
// 
// Watch Files For Changes
gulp.task('watch', function() {
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