var gulp = require( 'gulp' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    sass  = require( 'gulp-sass' ),
    cleanCSS  = require( 'gulp-clean-css' ),
    concat  = require( 'gulp-concat' ),
    imagemin  = require( 'gulp-imagemin' ),
    changed = require( 'gulp-changed' ),
    uglify  = require( 'gulp-uglify' );

var scss  = './scss/',
    cssdist = './build/css/',
    styleWatchFiles  = './scss/*.scss';
    js  = './js/',
    jsdist  = './build/js/';

var jsSRC = [
    js + 'wow.min.js'
];

var cssSRC =  [
  './css/style.css',
  './css/animate.min.css'
];

var imgSRC = './img/*',
    imgDEST = './build/img/';

function css() {
  return gulp.src([scss + 'style.scss'])
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('./css/'));
}

function concatCSS() {
  return gulp.src(cssSRC)
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest(cssdist));
}

function javascript() {
  return gulp.src(jsSRC)
  .pipe(concat('wow.js'))
  .pipe(uglify())
  .pipe(gulp.dest(jsdist));
}

function imgmin() {
  return gulp.src(imgSRC)
  .pipe(changed(imgDEST))
      .pipe( imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
      ]))
      .pipe( gulp.dest(imgDEST));
}

function watch() {
  gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
  gulp.watch(jsSRC, javascript);
  gulp.watch(imgSRC, imgmin);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;
exports.imgmin = imgmin;

var build = gulp.parallel(watch);
gulp.task('default', build);