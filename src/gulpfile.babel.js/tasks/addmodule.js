/*
 *  Module Creation Task
 *
 *  https://git.pixelpark.com/peter.kreinz/gulp-task-addmodule
 *  v0.1.2
 *
 * */

'use strict';

import gulp from 'gulp';
import fse from 'fs-extra';
import prompt from 'gulp-prompt';
import path from 'path';
import gutil from 'gulp-util';

const config = require( 'rc' )( 'app' );
const cssSuffix = '.css';
const hbsSuffix = '.handlebars';
const templateTypes = [ 'css', 'handlebars', 'json', 'json schema' ];


class AddModule {
    createCssTemplate( res, templateTypes ) {
        let modulePath = res.modname + '/' + res.modname;

        //css
        if ( res.types.indexOf( templateTypes[ 0 ] ) !== -1 ) {
            let file = path.join( config.srcDir, config.assetDir, 'css/modules/',
                modulePath + cssSuffix );
            let tmpl = '/**\n' +
                ' * ' + res.modname + '\n' +
                ' */\n';

            this.write( templateTypes[ 0 ], file, tmpl );
        }
    }

    createHbsTemplate( res, templateTypes ) {
        let modulePath = res.modname + '/' + res.modname;

        if ( res.types.indexOf( templateTypes[ 1 ] ) !== -1 ) {

            let file = path.join( config.srcDir, 'views/modules/', modulePath + hbsSuffix );
            let tmpl = '<div class="' + res.modname + '"></div>';

            this.write( templateTypes[ 1 ], file, tmpl );
        }
    }

    createJsonTemplate( res, templateTypes ) {
        let modulePath = res.modname + '/' + res.modname;

        if ( res.types.indexOf( templateTypes[ 2 ] ) !== -1 ) {
            let file = path.join( config.srcDir, 'data/modules/', modulePath + '.json' );
            let tmpl =
                '{\n' +
                '    "$schema": "/schema/modules/' + modulePath + '.json",\n' +
                '    "resourceType": "modules/' + modulePath + '",\n' +
                '    "identifier": "' + res.modname + '"\n' +
                '}';

            this.write( templateTypes[ 2 ], file, tmpl );
        }
    }

    createJsonSchemaTemplate( res, templateTypes ) {
        let modulePath = res.modname + '/' + res.modname;

        if ( res.types.indexOf( templateTypes[ 3 ] ) !== -1 ) {
            let file = path.join( config.srcDir, 'schema/modules/', modulePath + '.json' );
            var tmpl =
                '{\n' +
                '    "$schema": "http://json-schema.org/schema#",\n' +
                '    "title": "' + res.modname + '",\n' +
                '    "type": "object",\n' +
                '    "properties": {\n' +
                '        "resourceType": {\n' +
                '            "type": "string"\n' +
                '        },\n' +
                '        "identifier": {\n' +
                '            "type": "string",\n' +
                '            "pattern": "^' + res.modname + '"\n' +
                '        }\n' +
                '    }\n' +
                '}\n';

            this.write( templateTypes[ 3 ], file, tmpl );
        }
    }

    write( templateTypeStr, filePath, templateStr ) {
        try {
            fse.outputFileSync( filePath, templateStr );
            gutil.log( gutil.colors.green( 'Template' ), gutil.colors.blue( templateTypeStr ),
                gutil.colors.magenta( 'complete' ), '[' + filePath + ']' );
        }
        catch ( err ) {
            gutil.log( gutil.colors.red( err ) );
        }
    }

}

var mod = new AddModule();

gulp.task( 'addmodule', function() {

    gutil.log( '\n', gutil.colors.green( '++++ Module Creation Task ++++' ), '\n' );

    return gulp.src( '' )
        .pipe( prompt.prompt( [ {
            type: 'module name',
            name: 'modname',
            message: 'Please enter ' + gutil.colors.green( 'Module Name' ) + ':'

        },
            {
                type: 'checkbox',
                name: 'types',
                message: 'Please select ' + gutil.colors.green( 'Template' ) + ' to create:',
                choices: templateTypes
            } ], function( res ) {

            gutil.log( gutil.colors.green( 'Template Creation started' ),
                gutil.colors.magenta( '...' ) );

            if ( res.modname === undefined || res.modname.length === 0 ) {
                gutil.log( gutil.colors.red( 'Error: invalid module name!' ) );
                return;
            }

            //css
            mod.createCssTemplate( res, templateTypes );

            //handlebars
            mod.createHbsTemplate( res, templateTypes );

            //json
            mod.createJsonTemplate( res, templateTypes );

            //json schema
            mod.createJsonSchemaTemplate( res, templateTypes );

            gutil.log( gutil.colors.green( 'Template Creation completed' ), '\n' );
        } ) );
} );
