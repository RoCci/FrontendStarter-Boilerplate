'use strict';

import gulp from 'gulp';

const config = require( 'rc' )( 'app' );

gulp.task( 'copy', [ 'copy:data', 'copy:fonts', 'copy:pdf', 'copy:templates', 'copy:googleapis' ] );

gulp.task( 'copy:data', function() {
    return gulp
        .src( [
            config.srcDir + config.dataDir + '**/*.json'
        ] )
        .pipe( gulp.dest( config.distDir + config.dataDir ) );
} );

gulp.task( 'copy:fonts', function() {
    return gulp
        .src( [
            config.srcDir + config.assetDir + 'fonts/**/*'
        ] )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'fonts/' ) );
} );

gulp.task( 'copy:pdf', function() {
    return gulp
        .src( [
            config.srcDir + config.assetDir + 'pdf/**/*'
        ] )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'pdf/' ) );
} );

gulp.task( 'copy:templates', function() {
    return gulp
        .src( [
            config.srcDir + config.viewDir + '**/*.handlebars'
        ] )
        .pipe( gulp.dest( config.distDir + config.viewDir ) );
} );

gulp.task( 'copy:googleapis', function() {
    return gulp
        .src( [
            config.srcDir + config.assetDir + 'js/modules/googleapis/*.js'
        ] )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'js/modules/googleapis/' ) );
} );
