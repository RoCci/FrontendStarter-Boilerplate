'use strict';

import gulp from 'gulp';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import path from 'path';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';

const config = require( 'rc' )( 'app' );

gulp.task( 'svgstore', function() {

    return gulp
        .src( [
            config.srcDir + config.assetDir + 'img/icons/*.svg'
        ] )
        .pipe( svgmin( function( file ) {
            var prefix = path.basename( file.relative, path.extname( file.relative ) );
            return {
                plugins: [
                    {
                        cleanupIDs: {
                            prefix: prefix + '-',
                            minify: true
                        }
                    },
                    {
                        cleanupNumericValues: {
                            floatPrecision: 2
                        }
                    },
                    {
                        removeComments: true
                    }
                ]
            };
        } ) )
        .pipe( cheerio( {
            run: function( $ ) {
                $( '[fill]' ).removeAttr( 'fill' );
                $( '[fill-rule]' ).removeAttr( 'fill-rule' );
            },
            parserOptions: { xmlMode: true }
        } ) )
        .pipe( svgstore( { inlineSvg: true } ) )
        .pipe( rename( 'icons.handlebars' ) )
        .pipe( gulp.dest( config.distDir + config.viewDir + 'page/' ) );

} );
