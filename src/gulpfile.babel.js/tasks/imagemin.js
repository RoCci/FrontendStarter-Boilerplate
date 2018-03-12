'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

const config = require( 'rc' )( 'app' );

gulp.task( 'imagemin', function() {
    return gulp.src( config.srcDir + config.assetDir + 'img/**/*' )
        .pipe( imagemin( [
            imagemin.gifsicle( { interlaced: true } ),
            imagemin.jpegtran( { progressive: true } ),
            imagemin.optipng( { optimizationLevel: 5 } ),
            imagemin.svgo( { plugins: [ { removeViewBox: false } ] } )
        ] ) )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'img/' ) );
} );
