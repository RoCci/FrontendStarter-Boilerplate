'use strict';

import gulp from 'gulp';
import stylelint from 'gulp-stylelint';

const config = require( 'rc' )( 'app' );

gulp.task( 'stylelint', function() {

    return gulp.src( config.srcDir + config.assetDir + 'css/**/*.css' )
        .pipe( stylelint( {
            reporters: [
                { formatter: 'string', console: true }
            ]
        } ) );

} );
