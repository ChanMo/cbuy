/**
 * my gulp file
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://findchen.com
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var del = require('del');

/** sass **/
gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
          includePaths: [
            'node_modules/ju-css/src/scss',
          ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({stream:true}));
});

/** js **/
gulp.task('js', function(){
    return gulp.src('src/js/*.+(js|json)')
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.reload({stream:true}));
});

/** images **/
gulp.task('images', function(){
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'));
});

/** fonts **/
gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'));
});

/** clean for build **/
gulp.task('clean', function(){
    return del.sync('docs');
});


/** useref **/
gulp.task('useref', function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('docs'));
});

/** nunjucksRender **/
gulp.task('nunjucksRender', function(){
    return gulp.src(['src/html/**/*.html'])
        .pipe(nunjucksRender({
            path: ['src/html/']
        }))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream:true}));
});

/** browserSync **/
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

/** default **/
gulp.task('default', ['sass', 'js', 'nunjucksRender', 'browserSync'], function(){
    console.log('Hello Chen');
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/html/**/*.html', ['nunjucksRender']);
});

/** build **/
gulp.task('build', ['clean', 'sass', 'js', 'nunjucksRender', 'fonts', 'images', 'useref'], function(){
    console.log('Building files...');
})
