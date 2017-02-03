var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('server', function (){
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true
  });
});

gulp.task('css', function (){
  gulp.src('./app/stylesheets/main.styl')
    .pipe(stylus({use: nib()}))
    .pipe(gulp.dest('./app/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('html', function (){
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('jshint', function (){
  return gulp.src('.app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function (){
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
  gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
});

gulp.task('default', ['server', 'watch']);
