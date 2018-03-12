'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';

const config = require( 'rc' )( 'app' );

gulp.task( 'eslint', [ 'eslint:js', 'eslint:tasks', 'eslint:data', 'eslint:schema' ] );

gulp.task( 'eslint:js', function () {
    return gulp.src( config.srcDir + config.assetDir + 'js/**/*.@(js|jsx)' )
        .pipe( eslint() )
        .pipe( eslint.format() );
} );

gulp.task( 'eslint:tasks', function () {
    return gulp.src( config.gulpTaskDir + '*.@(js|jsx)' )
        .pipe( eslint() )
        .pipe( eslint.format() );
} );

gulp.task( 'eslint:data', function () {
    return gulp.src( config.srcDir + config.dataDir + '/**/*.json' )
        .pipe( eslint() )
        .pipe( eslint.format() );
} );

gulp.task( 'eslint:schema', function () {
    return gulp.src( config.srcDir + config.schemaDir + '/**/*.json' )
        .pipe( eslint() )
        .pipe( eslint.format() );
} );
