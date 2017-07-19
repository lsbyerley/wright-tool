var gulp = require('gulp');
var gls = require('gulp-live-server');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var minifycss = require('gulp-cssnano');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

global.buildPath = './public/';
global.srcPath = './src/';

// -----------------------------------------
// STYLES
// -----------------------------------------
gulp.task('styles', function() {
    gutil.log(gutil.colors.magenta('==== Compile - Styles ===='));

    return gulp.src(global.srcPath + 'styles/main.scss')
	.pipe(sass())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(autoprefixer({ browsers: ['ie >= 8', 'last 2 versions', '> 1%'], map: false }))
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest(global.buildPath + 'styles/'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss({safe: true}))
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest(global.buildPath + 'styles/'));

});

gulp.task('lint-styles', function () {
	gutil.log(gutil.colors.magenta('==== Lint - Styles ===='));

	return 	gulp.src(global.srcPath + 'styles/**/*.scss')
				.pipe(scsslint({
					config: global.srcPath + 'styles/scss-lint.yml',
					maxBuffer: 500 * 1024,
					reporterOutput: global.srcPath + 'styles/scss-output.xml'
				}));
});

// -----------------------------------------
// SCRIPTS
// -----------------------------------------
gulp.task('scripts', function() {
	gutil.log(gutil.colors.magenta('==== Compile - Scripts ===='));

	var b = browserify(global.srcPath + 'scripts/main.js', {
		list: true
	});

	return b.bundle()
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(source('main.js')) 					//Pass desired output filename to vinyl-source-stream
		.pipe(buffer())
		.pipe(gulp.dest(global.buildPath + 'scripts/'))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(global.buildPath + 'scripts/'));

});

gulp.task('dev-server', function() {

	var server = gls('server.js', {env: {NODE_ENV: 'development'}});
	server.start();

	//watch the server, routes, and config file for changes
	gulp.watch(['server.js', 'routes.js', './config/**/*.js'], function() {
      server.start.bind(server)()
    });

    //watch the views
    gulp.watch('views/**/*.html', function(file) {
    	console.log(file)
    	server.notify.apply(server, [file]);
    });

	//watch the scss files
    gulp.watch(global.srcPath + 'styles/**/*.scss', ['styles', 'lint-styles']);
    gulp.watch(global.buildPath + 'styles/**/*.css', function(file) {
        console.log(file)
    	server.notify.apply(server, [file]);
    });

    //watch the js files
    gulp.watch(global.srcPath + 'scripts/**/*.js', ['scripts']);
    gulp.watch(global.buildPath + 'scripts/**/*.js', function(file) {
    	console.log(file)
    	server.notify.apply(server, [file]);
    });

});

gulp.task('prod-server', function() {

    // false turns off livereload
    var server = gls('server.js', {env: {NODE_ENV: 'production'}}, false);
	server.start();

})

gulp.task('build-dev', function(callback) {
	runSequence(
		'styles',
		'lint-styles',
		'scripts',
		'dev-server',
		callback
	);
});

gulp.task('build-prod', function(callback) {
    runSequence(
		'styles',
		'scripts',
		'prod-server',
		callback
	);
});
