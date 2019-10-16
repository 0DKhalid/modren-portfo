const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('html', () => {
  return gulp
    .src('stages/ejs/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  return gulp
    .src('stages/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
  return gulp
    .src('stages/scss/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  require('./server');
  gulp.watch('stages/ejs/**/*.ejs', ['html']);
  gulp.watch('stages/js/*.js', ['js']);
  gulp.watch('stages/scss/*.scss', ['css']);
});
