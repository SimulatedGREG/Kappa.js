/**
 * Require dependencies
 */
const gulp = require('gulp'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');


/**
 * gulp:default
 * Calls gulp:watch
 */
gulp.task('default', ['watch']);

/**
 * gulp:watch
 * Start browserSync and watch for src changes
 */
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch('src/kappa.js', ['build']).on('change', browserSync.reload);
});

/**
 * gulp:build
 * Transpile src from es6 and save to dist
 */
gulp.task('build', () => {
  return gulp.src('src/kappa.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('kappa.min.js'))
    .pipe(gulp.dest('dist'));
});
