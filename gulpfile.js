var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gzip = require('gulp-gzip'),
    util = require('gulp-util');

/*
 |--------------------------------------------------------------------------
 | Gulp Tasks
 |--------------------------------------------------------------------------
 */

gulp.task('default', function(notify) {
    gulp.src('src/approve.js')
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
            .pipe(uglify().on('error', util.log))
            .pipe(gzip())
            .pipe(rename('approve.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(notify) {
    gulp.watch('src/approve.js', ['default']);
});