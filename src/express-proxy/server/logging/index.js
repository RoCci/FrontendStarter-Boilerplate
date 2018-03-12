'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var bunyan = require( 'bunyan' );

const config = require( '../config' );
const logDir = path.resolve( './log' );
const accessLogDir = logDir + '/access';
const errorLogDir = logDir + '/error';

// create log directories if not existent
(function( logPaths ) {
    logPaths.forEach( function( path ) {
        fs.existsSync( path ) || fs.mkdirSync( path );
    } );
})( [ logDir, accessLogDir, errorLogDir ] );

var logger;

if ( process.env.NODE_ENV === 'development' ) {
    logger = bunyan.createLogger( {
        name: 'express-proxy',
        serializers: bunyan.stdSerializers,
        src: true,
        streams: [
            {
                level: 'debug',
                stream: process.stdout
            }
        ]
    } );
}
else {
    logger = bunyan.createLogger( {
        name: 'express-proxy',
        serializers: bunyan.stdSerializers,
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'info',
                type: 'rotating-file',
                path: accessLogDir + '/access.log',
                period: '1d',
                count: 10
            },
            {
                level: 'error',
                type: 'rotating-file',
                path: errorLogDir + '/error.log',
                period: '1d',
                count: 10
            }
        ]
    } );
}

module.exports = logger;
