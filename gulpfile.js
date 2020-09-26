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
const browserSync = require('browser-sync').create();

const { parseFileName } = require('./util/util');

const ejsFullPath = 'stages/ejs/**/*.ejs';
const ejsPath = 'stages/ejs/*.ejs';
const scriptFileName = 'public/assets.json';
const jsPath = 'stages/js/*.js';
const scssPath = 'stages/scss/*.scss';
const scssMainPath = 'stages/scss/main.scss';
const imgPath = 'stages/assets/img/*';
const dataPath = 'stages/data/*';

function ejsTask(done) {
  gulp
    .src(ejsPath)
    .pipe(
      ejs({
        fileName:
          process.env.NODE_ENV === 'production' ? parseFileName() : 'main.js'
      })
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));

  done();
}

function changeScriptName(done) {
  gulp
    .src(ejsPath)
    .pipe(
      ejs({
        fileName:
          process.env.NODE_ENV === 'production' ? parseFileName() : 'main.js'
      })
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('dist'));

  done();
}

function jsDevTask(done) {
  gulp
    .src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
  done();
}

function jsProdTask(done) {
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
    .pipe(gulp.dest('dist'))
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
  browserSync.init({
    watch: true,
    startPath: './dist',
    server: {
      baseDir: './'
    }
  });
  gulp.watch(ejsFullPath, ejsTask);
  gulp.watch(
    jsPath,
    process.env.NODE_ENV === 'production' ? jsProdTask : jsDevTask
  );
  gulp.watch(scssPath, cssTask);
  gulp.watch(scriptFileName, changeScriptName);
  gulp.watch(imgPath, imgTask);
  gulp.watch(dataPath, dataTask);
}

exports.js = process.env.NODE_ENV === 'production' ? jsProdTask : jsDevTask;
exports.build = gulp.series(cssTask, imgTask, ejsTask, dataTask);

exports.default = watchFiles;
