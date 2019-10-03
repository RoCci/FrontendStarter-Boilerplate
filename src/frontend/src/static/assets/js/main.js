'use strict';

require( 'babel-polyfill' );
// Adds html <picture> element to IE
require( 'picturefill' );
// Adds element.classList object to IE
require( 'classlist-polyfill' );
// Adds promises to IE
require( 'promise-polyfill' );
require( 'jquery' );
require( './modules/overlay' );

// modules

const MainFlag = require( './modules/mainFlag' );
let mainFlagElement = document.querySelector( '.js-mainFlagToggle' );
if ( mainFlagElement ) {
    new MainFlag( mainFlagElement );
}
