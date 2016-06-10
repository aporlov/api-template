var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json")

gulp.task("scripts", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
  });
gulp.task('default', function(){
    nodemon({
        script:'dist/main.js',
        ext:'js',
        ignore:['./node_modules/**']
    })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart',function(){
        console.log('Restarting');
                  }); 

});