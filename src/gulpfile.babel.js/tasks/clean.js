'use strict';

import gulp from 'gulp';
import del from 'del';

const config = require( 'rc' )( 'app' );

gulp.task( 'clean', function() {
    return del( [
        config.distDir
    ] );
} );

gulp.task( 'clean:test', function() {
    return del( [
        config.distDir + config.assetDir + 'js/main.spec.js'
    ] );
} );
