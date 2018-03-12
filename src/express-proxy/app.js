'use strict';

var fs = require( 'fs' );
var path = require( 'path' );

// config
var config = require( './server/config' );

// express
var express = require( 'express' );
var exphbs = require( 'express-handlebars' );

// middleware
var rewrite = require( 'express-urlrewrite' );
var compression = require( 'compression' );
var minifyHtml = require( 'express-minify-html' );
var expSubdomain = require( 'express-subdomain' );
var helmet = require( 'helmet' );

// logging
var logger = require( './server/logging' );

// express
var app = express();
var hbs = exphbs.create( {
    defaultLayout: 'main',
    layoutsDir: path.resolve( config.frontendDir + config.distDir + config.viewDir, 'layouts' ),
    helpers: {
        include: require( './server/helpers/include.js' )
    }
} );

// app engine
app.engine(
    'handlebars',
    hbs.engine
);
app.set( 'views', config.frontendDir + config.distDir + config.viewDir );
app.set( 'view engine', 'handlebars' );

// harden
app.use( helmet() );

// gzip
app.use( compression() );

// minify HTML
if ( app.get( 'env' ) === 'production' ) {
    app.use( minifyHtml( {
        override: true,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }
    } ) );
}

// logging
app.use( function( req, res, next ) {
    logger.info( { req: req } );
    next();
} );

// rewrite for asset version (fallback for dev)
// should be handled in apache/nginx via rewrite and should never match here
// f.e.: /assets/123/img/foo.bar > /assets/img/foo.bar
if ( config.assetRewriteRegex ) {
    app.use( rewrite( new RegExp( config.assetRewriteRegex ), '$1$2' ) );
}

// static files
// serve static files only when no passenger support
if ( typeof(PhusionPassenger) === 'undefined' ) {
    app.use( '/assets', express.static( config.frontendDir + config.distDir + config.assetDir, { maxAge: '14 days' } ) );
    app.use( '/schema', express.static( config.frontendDir + config.srcDir + config.schemaDir ) );
}

// setup routes to data sources
config.routes[ app.settings.env ].forEach( function( route ) {

    var router = express.Router();

    router.all( route.path, require( './server/dataSource/index' )( route.dataSource ) );

    if ( route.subdomain ) {
        app.use( expSubdomain( route.subdomain, router ) );
        logger.info( 'Listening for route %s.<hostname>%s with %s-data-source.',
            route.subdomain, route.path, route.dataSource.type );
    }
    else {
        app.use( router );
        logger.info( 'Listening for route *.<hostname>%s with %s-data-source.',
            route.path, route.dataSource.type );
    }

} );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
    app.use( function( err, req, res, next ) {
        res.status( err.status || 500 );
        res.render( 'page/error', {
            message: err.message,
            error: err
        } );
        logger.error( err );
    } );
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'page/error', {
        message: err.message,
        error: {
            message: err.message,
            status: res.statusCode
        }
    } );
    logger.error( err );
} );

module.exports = app;
