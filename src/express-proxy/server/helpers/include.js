'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var config = require( '../config' );
var exphbs = require( 'express-handlebars' );
var logger = require( '../logging' );

var include;
var handlebars = exphbs.create( {
    helpers: { include: include }
} ).handlebars;

function extendJSON( json ) {
    Object
        .keys( json )
        .forEach( function( key ) {
            if ( typeof json[ key ] !== 'object' && key === 'json' ) {
                var data = fs.readFileSync(
                    path.join( config.frontendDir + config.distDir + config.dataDir + json[ key ] + '.json' )
                ).toString();
                Object.assign( json, JSON.parse( data ) );
            }
            else if ( typeof json[ key ] === 'object' ) {
                extendJSON( json[ key ] );
            }
        } );
    return json;
}

include = function( context, options ) {
    var hbs;
    var model;
    var resourceType;
    var resourcePath;
    var template;
    var view;

    // get data
    if ( options.hash.path ) {
        model = context[ options.hash.path ];
    }
    else {
        model = options.data.root;
    }

    model = extendJSON( model );

    // get resourceType
    resourceType = options.hash.resourceType || model.resourceType;

    // template
    template = options.hash.template;

    // template
    if ( template ) {
        resourceType = resourceType.replace( /[^\/]*$/, template );
    }

    // get view
    resourcePath = path.join( config.frontendDir, config.distDir, config.viewDir, resourceType + '.handlebars' );
    view = fs.readFileSync( resourcePath ).toString();

    hbs = handlebars.compile( view, { noEscape: true } );

    return hbs( model, {
        helpers: {
            include: include
        }
    } );
};

module.exports = include;
