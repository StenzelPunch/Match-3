var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('dev', function() {
  gulp.src('game')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});