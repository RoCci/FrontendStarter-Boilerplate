'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var logger = require( '../../logging' );
var config = require( '../../config' );

function file( req, res, next, options, callback ) {
    var dataDir = path.join( config.frontendDir + config.distDir + config.dataDir + 'page' );
    var filePath;

    // extend request with json extension
    if ( req.path.slice( -1 ) === '/' ) {
        filePath = req.path + 'index' + '.json';
    }
    else {
        filePath = req.path + '.json';
    }

    // read json file and call callback
    fs.readFile( path.join( dataDir + filePath ), function( err, data ) {
        if ( err ) {
            logger.debug( err );
        }
        callback( err, null, data, next );
    } );
}

module.exports = file;
