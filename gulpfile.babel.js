import 'babel-polyfill';

import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import clean from 'gulp-clean';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

const clientConfig = {
  src: './src/client/index.js',
  debug: true,
  output: 'index.js',
  loadMaps: true,
  dest: './public/client',
  plugin: 'livereactload'
};

function compile(opts) {
  const {src, debug, output, dest, loadMaps, watch, node, plugin} = opts;
  const bundler = watchify(browserify(src, {debug, node, plugin}).transform(babelify));

  function rebundle() {
    bundler.bundle()
      .on('error', err => console.error(err))
      .pipe(source(output))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps}))
      .pipe(sourcemaps.write('./'))
      .pipe(clean({force: true}))
      .pipe(gulp.dest(dest));
  }

  if (watch) {
    bundler.on('update', function() {
      rebundle();
    });
  }

  rebundle();
}

// Build Tasks
gulp.task('build:client', () => compile(clientConfig));
gulp.task('build:server', () => {
  return gulp.src('src/server/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./public/server'));
});
gulp.task('build:style', function () {
  return gulp.src('src/styles/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/styles'));
});
gulp.task('build', ['build:client', 'build:server', 'build:style']);

// Watch Tasks
gulp.task('watch:client', () => compile({...clientConfig, watch: true}));
gulp.task('watch:server', () => gulp.watch('src/server/**/*.js', ['build:server']));
gulp.task('watch:style', () => gulp.watch('src/styles/**/*.scss', ['build:style']));
gulp.task('watch:all', ['watch:client', 'watch:server', 'watch:style']);
gulp.task('watch', ['watch:all'], () => nodemon({script: 'public/server/index.js'}));
gulp.task('default', ['watch']);
