'use strict';

import gulp from 'gulp';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

const config = require( 'rc' )( 'app' );

gulp.task( 'modernizr', function() {

    return gulp.src( [
            config.srcDir + config.assetDir + 'css/**/*.css',
            config.srcDir + config.assetDir + 'js/**/*.js'
        ] )
        .pipe( modernizr( {
            options: [
                'setClasses',
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind'
            ]
        } ) )
        .pipe( uglify() )
        .pipe( rename( 'modernizr-custom.min.js' ) )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'js/vendor/modernizr/' ) );
} );
