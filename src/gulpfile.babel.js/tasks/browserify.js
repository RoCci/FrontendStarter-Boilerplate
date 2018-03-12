'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import hbsfy from 'hbsfy';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import assign from 'lodash/assign';
import browserSync from 'browser-sync';
import path from 'path';

const config = require( 'rc' )( 'app' );

const JS_SOURCE = path.join( config.srcDir, config.assetDir, 'js/main.js' );
const JS_DIST = path.join( config.distDir, config.assetDir, 'js/' );

const JS_TEST_SOURCE = path.join( config.srcDir, config.assetDir, 'js/main.spec.js' );
const JS_TEST_DIST = path.join( config.distDir, config.assetDir, 'js/' );

function errorHandler( err ) {
    gutil.log( gutil.colors.red.bold.underline( 'Browserify Error' ) );
    gutil.log( gutil.colors.red( err.toString() ) );
    this.emit( 'end' );
}

gulp.task( 'browserify', [ 'browserify:dev', 'browserify:production' ] );

gulp.task( 'browserify:dev', function() {
    const customOpts = {
        entries: [ JS_SOURCE ],
        debug: true
    };

    const opts = assign( {}, watchify.args, customOpts );
    const b = watchify( browserify( opts ) )
        .transform(hbsfy)
        .transform( babelify );

    b.on( 'update', bundle );
    b.on( 'log', gutil.log );

    function bundle() {
        return b.bundle()
            .on( 'error', errorHandler )
            .pipe( source( 'main.js' ) )
            .pipe( buffer() )
            .pipe( gulp.dest( JS_DIST ) )
            .pipe( size( {
                title: 'Browserify local (with sourcemap)',
                showFiles: true,
                gzip: false
            } ) )
            .pipe( browserSync.stream() );
    }

    return bundle();
} );

gulp.task( 'browserify:prod', function() {
    const b = browserify( JS_SOURCE )
        .transform(hbsfy)
        .transform( babelify );

    return b.bundle()
        .on( 'error', errorHandler )
        .pipe( source( 'main.js' ) )
        .pipe( buffer() )
        .pipe( uglify( {} ) )
        .pipe( gulp.dest( JS_DIST ) )
        .pipe( size( {
            title: 'Browserify production (minified without sourcemap)',
            showFiles: true,
            gzip: true
        } ) );
} );

gulp.task( 'browserify:test', function () {
    const b = browserify( JS_TEST_SOURCE )
        .transform( babelify );

    return b.bundle()
        .on( 'error', errorHandler )
        .pipe( source( 'main.spec.js' ) )
        .pipe( buffer() )
        .pipe( gulp.dest( JS_TEST_DIST ) )
        .pipe( size( {
            title: 'Browserify local test (with sourcemap)',
            showFiles: true,
            gzip: false
        } ) )
        .pipe( browserSync.stream() );
} );
