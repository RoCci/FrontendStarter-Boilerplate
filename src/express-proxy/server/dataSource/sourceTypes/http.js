'use strict';

var fs = require( 'fs' );
var path = require( 'path' );

function getRequestBody( request ) {
    var body;
    if ( request.get( 'content-length' ) ) {
        // POST params
        body = [];
        request.on( 'data', function( chunk ) {
            body.push( chunk );
        } );
        request.on( 'end', function() {
            body = Buffer.concat( body );
        } );
    }
    else {
        body = request.body;
    }
    return body;
}

function getTargetUrl( request, options ) {
    var targetUrl = [];
    targetUrl.push( request.protocol );
    targetUrl.push( '://' );
    targetUrl.push( options.host );
    targetUrl.push( ':' );
    targetUrl.push( options.port );
    targetUrl.push( request.originalUrl );
    targetUrl = targetUrl.join( '' );
    return targetUrl;
}

function getTargetHeaders( request ) {
    var targetHeaders = {};
    Object
        .keys( request.headers )
        .forEach( function( key ) {
            targetHeaders[ key ] = request.headers[ key ];
        } );

    return targetHeaders;
}

function http( req, res, next, options, callback ) {
    var request = require( 'request' );

    request( {
            baseUrl: req.baseUrl,
            body: getRequestBody( req ),
            cookies: req.cookies,
            fresh: req.fresh,
            gzip: true,
            headers: getTargetHeaders( req ),
            hostname: options.host,
            method: req.method,
            originalUrl: req.originalUrl,
            params: req.params,
            path: req.path,
            query: req.query,
            route: req.route,
            secure: req.secure,
            signedCookies: req.signedCookies,
            stale: req.stale,
            subdomains: req.subdomains,
            uri: getTargetUrl( req, options ),
            xhr: req.xhr,
            encoding: null,
            followRedirect: false
        },
        function( err, response, body ) {
            callback( err, response, body, next );
        }
    );
}

module.exports = http;
