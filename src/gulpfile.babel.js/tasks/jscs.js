'use strict';

import gulp from 'gulp';
import jscs from 'gulp-jscs';

const config = require( 'rc' )( 'app' );

gulp.task( 'jscs', function () {
    return gulp.src( config.srcDir + config.assetDir + 'js/**/*.js' )
        .pipe( jscs( { fix: false } ) )
        .pipe( jscs.reporter() );
} );
