var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var webpack = require('webpack-stream');
var runSequence = require('run-sequence');
var del = require('del');
var env = require('gulp-env');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var npm_package = require('./package.json');
var fs = require('fs');

gulp.task('webserver', function() {
    connect.server({
        port: 8080,
        livereload: true,
        root: 'build',
        debug: true,
        middleware: function (connect, opt) {
            return [
                proxy('/api', {
                    target: 'http://localhost:8000'
                })
            ];
        }
    })
});

gulp.task('set-env', function () {
    env({
        vars: {
            NODE_ENV: 'production'
        }
    });
});

gulp.task('webpack', function () {
    return gulp.src('app/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function () {
    return del(['build/*']);
});

gulp.task('static', function() {
    return gulp.src(['app/img/**/*', 'app/partials/**/*'], {base: 'app'})
        .pipe(gulp.dest('build'));
});

gulp.task('build', function (callback) {
    runSequence('clean', 'webpack', function (error) {
        callback(error);
    });
});

gulp.task('version', function () {
    fs.writeFile('build/version.js', "var version = '" + npm_package.version + "';");
});

gulp.task('dist', function () {
    return gulp.src('build/**')
        .pipe(tar('armada-' + npm_package.version + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', function (callback) {
    runSequence('set-env', 'build', 'static', 'version', 'dist', function (error) {
        callback(error);
    });
});
