const path = require('path');
const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const postcssImport = require('postcss-import');
const babel = require('gulp-babel');
const sequence = require('gulp-sequence');
const replace = require('gulp-replace');

const modulesDir = path.resolve('node_modules');

gulp.task('clean', () => del(['lib']));

gulp.task('copy:all', () => gulp.src('src/**/*')
    .pipe(gulp.dest('lib')));

gulp.task('copy:assets', () => gulp.src('src/**/*.!(postcss|jsx|js)?(.map)')
    .pipe(gulp.dest('lib')));

gulp.task('build:css', () => gulp.src('src/**/*.postcss')
    .pipe(sourcemaps.init())
    .pipe(postcss([postcssImport({
      path: ['node_modules', 'lib', 'lib/assets/styles', './'],
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib')));

gulp.task('build:js', () => gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react', 'es2015', 'stage-2'],
      plugins: [['resolver', { resolveDirs: [path.resolve('lib')] }]],
    }))
    .pipe(replace(new RegExp(`${modulesDir}/?`, 'g'), ''))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib')));

gulp.task('remove:jsx', () => del(['lib/**/*.jsx']));

gulp.task('build', sequence(
  'clean',
  'copy:all',
  ['build:css', 'build:js'],
  'remove:jsx'
));

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/**/*.postcss', ['build:css']);
  gulp.watch('./src/**/*.jsx', ['build:js']);
  gulp.watch('./src/**/*.js', ['build:js']);
  gulp.watch('./src/**/*.!(postcss|jsx|js)?(.map)', ['copy:assets']);
});

gulp.task('default', ['build']);
