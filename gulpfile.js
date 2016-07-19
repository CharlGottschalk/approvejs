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
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/approve.js', ['default']);
    gulp.watch('src/approve.strength.js', ['default']);
});

gulp.task('min', function(cb) {
    gulp.src('dist/approve.js')
        .pipe(sourcemaps.init())
            .pipe(uglify({preserveComments: 'license'}).on('error', util.log))
            .pipe(rename('approve.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('gzip', function(cb) {
    gulp.src('dist/approve.min.js')
        .pipe(sourcemaps.init())
            .pipe(gzip())
            .pipe(rename('approve.min.gzip.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('docs', function(cb) {
    exec('npm run-script generate-docs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});