'use strict';

var zlib = require( 'zlib' );
var logger = require( '../logging' );

/**
 * returns response with cloned headers
 */
function cloneHeaders( targetResponse, sourceResponse ) {
    let headers = sourceResponse.headers;
    Object
        .keys( headers )
        .forEach( function( key ) {
            targetResponse.set( key, headers[ key ] );
        } );

    // revert setting of transfer-encoding (https://github.com/expressjs/express/issues/2893)
    targetResponse.set( 'transfer-encoding', '' );

    return targetResponse;
}

/**
 * returns response with cloned status code
 */
function cloneStatus( targetResponse, sourceResponse ) {
    return targetResponse.status( sourceResponse.statusCode );
}

/**
 * compress response if supported by client
 */
function compress( request, response, next, data, callback ) {
    if ( request.acceptsEncodings( 'gzip' ) ) {
        try {
            zlib.gzip( new Buffer( data ), function( err, result ) {
                if ( !err ) {
                    response.set( 'content-length', result.length );
                    response.set( 'content-encoding', 'gzip' );
                    callback( response, result );
                }
                else {
                    logger.error( err, 'Error while compressing response data' );
                    callback( response, data );
                }
            } );
        }
        catch ( err ) {
            next( err );
        }
    }
    else {
        callback( response, data );
    }
}

function getTemplateJson( data ) {
    let json = JSON.parse( data );

    if ( json.resourceType ) {
        return json;
    }
    else {
        return null;
    }
}

function dataSource( options ) {

    return function dataSource( clientRequest, clientResponse, next ) {

        require( './sourceTypes/' + options.type + '.js' )(
            clientRequest,
            clientResponse,
            next,
            options,
            function( err, dataSourceResponse, data, next ) {

                if ( !err ) {
                    if ( dataSourceResponse ) {
                        clientResponse = cloneStatus( clientResponse, dataSourceResponse );
                        clientResponse = cloneHeaders( clientResponse, dataSourceResponse );
                    }

                    try {
                        let templateJson = getTemplateJson( data );
                        if ( templateJson ) {
                            clientResponse.render( templateJson.resourceType, templateJson, function( err, html ) {
                                if ( !err ) {
                                    compress( clientRequest, clientResponse, next, html, function( clientResponse, data ) {
                                        clientResponse.set( 'content-type', 'text/html' );
                                        clientResponse.send( data );
                                    } );
                                }
                                else {
                                    next( err );
                                }

                            } );
                        }
                        else {
                            compress( clientRequest, clientResponse, next, data, function( clientResponse, data ) {
                                clientResponse.send( data );
                            } );
                        }
                    }
                    catch ( e ) {
                        compress( clientRequest, clientResponse, next, data, function( clientResponse, data ) {
                            clientResponse.send( data );
                        } );
                    }

                }
                else {
                    err.stack = err.message;
                    err.message = 'File not found.';
                    err.status = 404;
                    next( err );
                }

            } );
    }
}

module.exports = dataSource;
