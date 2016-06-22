var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript'),
    clean = require('gulp-clean');

var tsProject = ts.createProject("tsconfig.json")

gulp.task('clean', function () {
  gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task("compile", function () {
    gulp.start('clean');
    var stream = tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
    return stream;
});

gulp.task('demon', ['compile'], function(){
   var stream =  nodemon({
        script:'./dist/main.js',
        ext:'ts',
        ignore:['./node_modules/**/*' ],
        tasks: ['compile']
    })
    return stream;
});
gulp.task('default', ['demon']);