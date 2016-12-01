var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('start', ['watch', 'inject']);
gulp.task('build', ['compress', 'minify-css']);

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/!**/!*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

/*-------------BUILD--------------*/

gulp.task('compress', function() {
    gulp.src('./src/**/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', function () {
    gulp.src('./src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

