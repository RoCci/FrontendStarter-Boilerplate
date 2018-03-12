'use strict';

require( 'babel-polyfill' );
// Adds html <picture> element to IE
require( 'picturefill' );
// Adds element.classList object to IE
require( 'classlist-polyfill' );
// Adds promises to IE
require( 'promise-polyfill' );
require( './modules/overlay' );

// modules
const CheckForm = require( './modules/checkForm' );
let  checkFormElement = document.querySelector( '.js-mainAuthForm' );
if (  checkFormElement ) {
    new CheckForm( checkFormElement );
}

const CookieLayer = require( './modules/cookieLayer' );
let  cookieLayerElement = document.querySelector( '.js-cookieLayer' );
if (  cookieLayerElement ) {
    new CookieLayer( cookieLayerElement );
}

const MainFlag = require( './modules/mainFlag' );
let  mainFlagElement = document.querySelector( '.js-mainFlagToggle' );
if (  mainFlagElement ) {
    new MainFlag( mainFlagElement );
}

const VehicleSelection = require( './partials/vehicleSelection' );
let vehicleSelectionElement = document.querySelector( '.js-vehicle-selection' );
if (  vehicleSelectionElement ) {
    new VehicleSelection( vehicleSelectionElement );
}

const DealerLocator = require( './modules/dealerLocator/DealerLocator' );
new DealerLocator();
