const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('html', () => {
  return gulp
    .src('stage/ejs/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  return gulp
    .src('stage/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
  return gulp
    .src('stage/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  require('./server');
  gulp.watch('stage/ejs/**/*.ejs', ['html']);
  gulp.watch('stage/js/*.js', ['js']);
  gulp.watch('stage/scss/*.scss', ['css']);
});
