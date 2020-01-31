const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const hash = require('gulp-hash');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('html', () => {
  return gulp
    .src('stages/ejs/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('change-script-name', () => {
  //parse js file name for dynamic import in ejs template
  const fileData = fs.readFileSync(
    path.resolve(__dirname, 'public/assets.json')
  );
  const pasreData = JSON.parse(fileData);
  const fileName = pasreData['main.js'];

  return gulp
    .src('stages/ejs/*.ejs')
    .pipe(ejs({ fileName: fileName }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  return gulp
    .src('stages/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(hash())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(
      hash.manifest('public/assets.json', {
        // Generate the manifest file
        deleteOld: true,
        sourceDir: __dirname + '/dist/js'
      })
    )
    .pipe(gulp.dest('.'));
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
  gulp.watch('public/assets.json', ['change-script-name']);
});
