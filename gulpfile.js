var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    gzip = require('gulp-gzip'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    exec = require('child_process').exec,
    packageJSON = require('./package.json'),
    jshintConf = packageJSON.jshintConf;

var lintFiles = [
    'src/_02.approve.js', 
    'src/_03.approve.creditcard.js', 
    'src/_04.approve.strength.js'
];

/*
 |--------------------------------------------------------------------------
 | Gulp Tasks
 |--------------------------------------------------------------------------
 */

gulp.task('compile', function(cb) {
    return gulp.src('src/_*.js')
        .pipe(concat('approve.js').on('error', util.log))
        .pipe(gulp.dest('dist'));
});

gulp.task('min', ['compile'], function(cb) {
    return gulp.src('dist/approve.js')
        .pipe(sourcemaps.init())
            .pipe(uglify({preserveComments: 'license'}).on('error', util.log))
            .pipe(rename('approve.min.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('gzip', ['min'], function(cb) {
    return gulp.src('dist/approve.min.js')
        .pipe(sourcemaps.init())
            .pipe(gzip())
            .pipe(rename('approve.min.gzip.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('docs', ['gzip'], function(cb) {
    exec('npm run-script generate-docs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('lint', function() {
    jshintConf.lookup = false;
    return gulp.src(lintFiles)
        .pipe(jshint(jshintConf))
        .pipe(jshint.reporter(stylish));
});

gulp.task('test', ['compile'], function(cb) {
    exec('npm run-script test', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('default', ['docs']);