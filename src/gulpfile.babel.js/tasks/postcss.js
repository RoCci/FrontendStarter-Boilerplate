'use strict';

import gulp from 'gulp';
import postcss from 'gulp-postcss';
import discardEmpty from 'postcss-discard-empty';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import normalize from 'postcss-normalize';
import cssnesting from 'postcss-nesting';
import csscalc from 'postcss-calc';
import csscustomprop from 'postcss-custom-properties';
import cssextend from 'postcss-extend';
import custommedia from 'postcss-custom-media';
import each from 'postcss-each';
import cssimport from 'postcss-import';
import color from 'postcss-color-function';
import cssnano from 'cssnano';
import mixins from 'postcss-mixins';
import reporter from 'postcss-reporter';
import rename from 'gulp-rename';

const config = require( 'rc' )( 'app' );

const processors = [
    cssimport,
    discardEmpty,
    normalize,
    csscustomprop,
    mixins,
    cssnesting,
    cssextend,
    custommedia,
    each,
    csscalc( { mediaQueries: true } ),
    autoprefixer( { browsers: config.autoprefixer } ),
    cssnano,
    color,
    reporter( { clearMessages: true } )
];

gulp.task( 'postcss', [ 'postcss:styles', 'postcss:print', 'postcss:critical' ] );

gulp.task( 'postcss:styles', function() {
    return gulp.src( config.srcDir + config.assetDir + 'css/styles.css' )
        .pipe( sourcemaps.init() )
        .pipe( postcss( processors ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'css/' ) );
} );

gulp.task( 'postcss:print', function() {
    return gulp.src( config.srcDir + config.assetDir + 'css/print.css' )
        .pipe( sourcemaps.init() )
        .pipe( postcss( processors ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( config.distDir + config.assetDir + 'css/' ) );
} );

gulp.task( 'postcss:critical', function() {
    return gulp.src( config.srcDir + config.assetDir + 'css/critical.css' )
        .pipe( postcss( processors ) )
        .pipe( rename( 'critical.handlebars' ) )
        .pipe( gulp.dest( config.distDir + config.viewDir + 'page/' ) );
} );
