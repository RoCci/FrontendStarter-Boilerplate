'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import batch from 'gulp-batch';
import sequence from 'gulp-sequence';

const config = require( 'rc' )( 'app' );

gulp.task( 'watch', function() {

    // data
    watch(
        config.srcDir + config.dataDir + '**/*.json',
        batch( function( events, done ) {
            sequence( 'eslint:data', 'copy:data', done );
        } ) );

    // css for screen
    watch(
        config.srcDir + config.assetDir + 'css/**/!(*print).css',
        batch( function( events, done ) {
            sequence( 'stylelint', 'postcss:styles', 'postcss:critical', done );
        } ) );

    // css for print
    watch(
        config.srcDir + config.assetDir + 'css/**/(*print).css',
        batch( function( events, done ) {
            sequence( 'stylelint', 'postcss:print', done );
        } ) );

    // img
    watch(
        config.srcDir + config.assetDir + 'img/**/*',
        batch( function( events, done ) {
            sequence( 'imagemin', done );
        } ) );

    // js
    watch(
        [
            config.srcDir + config.assetDir + 'js/**/*.@(js|jsx)',
            config.gulpTaskDir + '*.@(js|jsx)'
        ],
        batch( function( events, done ) {
            sequence( 'jscs', 'eslint:js', 'eslint:tasks', done );
        } ) );

    // views
    watch(
        config.srcDir + config.viewDir + '**/*.handlebars',
        batch( function( events, done ) {
            sequence( 'copy:templates', done );
        } ) );
} );
