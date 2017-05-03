var gulp=require('gulp');
var browserSync=require('browser-sync').create();
var useref=require('gulp-useref');
var gulpIf=require('gulp-if');
var del=require('del');

// Single file zip
var concat=require('gulp-concat');
var cssnano=require('gulp-cssnano');
var uglify = require('gulp-uglify');

//hot reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: 'src'
		}
	})
})

// gulp.task('useref', function(){ //run all once
// 	return gulp.src('src/*.html')
// 			.pipe(useref())
// 			.pipe(gulpIf('*.js', uglify()))
// 			.pipe(gulpIf('*.css', cssnano()))
// 			.pipe(gulp.dest('dist'))
// })

gulp.task('style', function(){ //run only css files
	return gulp.src('src/style/*.css')
			.pipe(concat('style.min.css'))
			.pipe(cssnano())
			.pipe(gulp.dest('dist'))
})

gulp.task('js', function(){ //run only js files
	return gulp.src('src/js/*.js')
			.pipe(concat('quiz.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'))
})

gulp.task('default', ['js', 'style'], function(){
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/style/**/*.css', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
})

gulp.task('clean:dist', function(){
	return del(['dist/*', '!dist/style']);
})