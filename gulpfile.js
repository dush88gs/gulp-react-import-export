// Requires the Gulp itself
var gulp = require('gulp');

// Requires the plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var babelify = require('babelify');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');

// Convert Sass to CSS
gulp.task('sass', function(){
  var autoprefixerOptions = {
    browsers: ['last 5 versions', '> 5%', 'Firefox ESR']
  };
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Live reload the index.html in app directory
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// Minify images
gulp.task('images', function(){
  var imgOut = 'dist/images';
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(newer(imgOut)) //filter and send only new and modified images 
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5
  }))
  .pipe(gulp.dest(imgOut));
});

// Copy all .html files to dist folder
gulp.task('html', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('css', function() {
  return gulp.src('app/css/**/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'));
});

// Converts jsx(react) to js
gulp.task('jsx', function() {
  var bundler = browserify('app/react/react.js')
                .transform('babelify', {
                  presets : [ 'es2015', 'react' ]
                });

  bundler.bundle().on('error', function(err) {
    console.error('[browserify error]', err.message);
  }).pipe(source('react.js'))
    .pipe(gulp.dest('app/js'));
});

// Minify js
gulp.task('js', function() {
  return gulp.src('app/js/script.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// Copy fonts folder to dist without doing any modifications
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

// Copy modified react.js in to dist
gulp.task('copy_react', function() {
  return gulp.src('app/js/react.js')
  .pipe(gulp.dest('dist/js'));
});

//Delete unused files
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Gulp watch syntax
// gulp.task('watch', ['browserSync', 'sass', 'jsx'], function (){
gulp.task('watch', function (callback) {
  runSequence('sass', 'jsx', 'browserSync', callback)
  // Reloads the browser and compiles SASS to CSS whenever style.scss file change
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser and compiles JSX to JS whenever react.js file change
  gulp.watch('app/react/**/*.js', ['jsx']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/react/**/*.js', browserSync.reload);
  // Other watchers
});

// Gulp build syntax for building the "dist" folder
gulp.task('build', function (callback) {
  runSequence('clean:dist', 'watch', 'html', 'css', 'js', 'copy_react', 'images', 'fonts', callback)
});