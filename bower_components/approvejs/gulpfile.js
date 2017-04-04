var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    util = require('gulp-util'),
    lec = require('gulp-line-ending-corrector'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    exec = require('child_process').exec,
    packageJSON = require('./package.json'),
    jshintConf = packageJSON.jshintConf;

var lintFiles = [
    //'./src/lib/_02.approve.start.js',
    './src/tests/*.js',
    //'./src/lib/_04.approve.end.js',
    './src/*.js'
];

/*
 |--------------------------------------------------------------------------
 | Gulp Tasks
 |--------------------------------------------------------------------------
 */
gulp.task('min', function(cb) {
    return gulp.src('./dist/approve.js')
        .pipe(sourcemaps.init())
            .pipe(uglify({preserveComments: 'license'}).on('error', util.log))
            .pipe(rename('approve.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('gzip', ['min'], function(cb) {
    return gulp.src('./dist/approve.min.js')
        .pipe(sourcemaps.init())
            .pipe(gzip())
            .pipe(rename('approve.min.gzip.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    jshintConf.lookup = false;
    return gulp.src(lintFiles)
        .pipe(jshint(jshintConf))
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['gzip']);