'use strict';

import gulp from 'gulp';
import download from 'gulp-download-stream';

const config = require( 'rc' )( 'app' );
const urls = require( '../../' + config.srcDir + 'data/urls.json' );

gulp.task( 'download', function () {
    return download( urls.pages )
        .pipe( gulp.dest( config.distDir + 'static/' ) );
} );
