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
const imagemin = require('gulp-imagemin');

const { parseFileName } = require('./util/util');

const ejsPath = 'stages/ejs/**/*.ejs';
const scriptFileName = 'public/assets.json';
const jsPath = 'stages/js/*.js';
const scssPath = 'stages/scss/*.scss';
const scssMainPath = 'stages/scss/main.scss';
const imgPath = 'stages/assets/img/*';
const dataPath = 'stages/data/*';

function ejsTask(done) {
  gulp
    .src(ejsPath)
    .pipe(ejs({ fileName: parseFileName() }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
  done();
}

function changeScriptName(done) {
  gulp
    .src(ejsPath)
    .pipe(ejs({ fileName: parseFileName() }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));
  done();
}

function jsTask(done) {
  gulp
    .src(jsPath)
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
  done();
}

function cssTask(done) {
  gulp
    .src(scssMainPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'));
  done();
}

function dataTask(done) {
  gulp.src(dataPath).pipe(gulp.dest('dist/data'));
  done();
}

function imgTask(done) {
  gulp.src(imgPath).pipe(imagemin()).pipe(gulp.dest('dist/img'));
  done();
}

function watchFiles() {
  require('./server');
  gulp.watch(ejsPath, ejsTask);
  gulp.watch(jsPath, jsTask);
  gulp.watch(scssPath, cssTask);
  gulp.watch(scriptFileName, changeScriptName);
  gulp.watch(imgPath, imgTask);
  gulp.watch(dataPath, dataTask);
}

exports.build = gulp.series(ejsTask, cssTask, jsTask, imgTask, dataTask);

exports.default = watchFiles;
