var gulp = require( 'gulp' ),
    del = require( 'del' ),
    sequence = require( 'run-sequence' ),
    libPath = 'public/lib',
    nodeModulesPath = 'node_modules';

gulp.task( 'clean', function() {
    return del( libPath + '/**/*', { force: true });
});

gulp.task( 'copy:libs', function( done ) {
    sequence( 'clean', 'copy:vendor', 'copy:rxjs', 'copy:angular', done );
});

gulp.task( 'copy:vendor', function() {
    return gulp.src([
        nodeModulesPath + '/core-js/client/**/*',
        nodeModulesPath + '/zone.js/dist/zone.js',
        nodeModulesPath + '/systemjs/dist/system-polyfills.js',
        nodeModulesPath + '/systemjs/dist/system.src.js',
        nodeModulesPath + '/systemjs/dist/system.src.js.map',
        nodeModulesPath + '/tslib/tslib.js'
      ])
      .pipe( gulp.dest( libPath ) );
});

gulp.task( 'copy:rxjs', function() {
    return gulp.src([
        nodeModulesPath + '/rxjs/**/*'
      ])
      .pipe( gulp.dest( libPath + '/rxjs' ) );
});

gulp.task( 'copy:angular', function() {
    return gulp.src([ nodeModulesPath + '/@angular/**/*' ]).pipe( gulp.dest( libPath + '/@angular' ) );
});


