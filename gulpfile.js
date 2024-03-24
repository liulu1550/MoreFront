const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const js = require('gulp-uglify');
const image_min = require('gulp-imagemin');
const cache = require('gulp-cache');
const pipeline = require('readable-stream').pipeline;
const bs = require("browser-sync").create();
const connect = require('gulp-connect');
// const htmlmin = require('gulp-htmlmin')
// const fileinclude = require('gulp-file-include')
// const util = require('gulp-util');

gulp.task('bs', function () {
    bs.init({
        'server':{
            'baseDir':'./'
        }
    })
});


gulp.task('css', function () {
    return pipeline(
        gulp.src('./src/css/**/*.scss'),
        sass().on("error",sass.logError),
        gulp.dest('./dist/css/'),
        cssnano(),
        rename({'suffix': '.min'}),
        gulp.dest('./dist/css/'),
        connect.reload(),
        bs.stream()
    )


});

gulp .task('js', function () {
    return pipeline(
        gulp.src('./src/js/**/*.js'),
        js({
            'toplevel':false,
            'compress':{
                'drop_console':false,
            }
        }),
        rename({'suffix': '.min'}),
        gulp.dest('./dist/js'),
        connect.reload(),

        bs.stream()
    )

});

gulp.task('image', function () {
    return pipeline(
        gulp.src('./src/images/*.*'),
        // cache(image_min()),
        gulp.dest("./dist/images/"),
        connect.reload(),
        bs.stream()

    )
});


gulp.task('html', function () {
    return pipeline(
        gulp.src('./templates/*.html'),
        gulp.dest('./html/'),
        connect.reload(),
        bs.stream()
    )
});

gulp.task('font', function () {
    return pipeline(
        gulp.src('./src/fonts/*.*'),
        gulp.dest('./dist/fonts/'),
        connect.reload(),
        bs.stream()
    )
});


gulp.task("watch",function () {
    gulp.watch("src/css/*.scss",gulp.parallel(['css']));
    gulp.watch("src/images/*.*",gulp.parallel(['image']));
    gulp.watch("src/js/*.js",gulp.parallel(['js']));
    gulp.watch("templates/*.html",gulp.parallel(['html']));
    gulp.watch("src/fonts/*.*",gulp.parallel(['font']));
});

gulp.task('server', function () {
    connect.server({
        root: './',
        port: 8888,
        livereload: true
    })
});

gulp.task('default', gulp.parallel(['watch','css','js', 'image', 'html', 'font', 'server']));
