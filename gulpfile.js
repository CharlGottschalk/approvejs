var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    util = require('gulp-util'),
    exec = require('child_process').exec;

/*
 |--------------------------------------------------------------------------
 | Gulp Tasks
 |--------------------------------------------------------------------------
 */

gulp.task('default', function(cb) {
    gulp.src([
            'src/approve.js',
            'src/approve.strength.js'
        ])
        .pipe(concat('approve.js').on('error', util.log))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
            .pipe(uglify().on('error', util.log))
            .pipe(gzip())
            .pipe(rename('approve.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));

    gulp.src('src/approve.config.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/approve.js', ['default']);
    gulp.watch('src/approve.strength.js', ['default']);
});

gulp.task('docs', function(cb) {
    exec('npm run-script generate-docs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});