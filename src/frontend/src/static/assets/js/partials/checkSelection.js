const Handlebars = require( 'handlebars' );
const Storage = require( '../utilities/storage' );

const CHECKSELECTION_TEMPLATE = '#checkSelection-template';
const CHECKSELECTION_TEXT_CLASS = '.js-checkSelection__text';

class CheckSelection {
    constructor() {
        this.source = document.querySelector( CHECKSELECTION_TEMPLATE );
        this.destination = document.querySelector( CHECKSELECTION_TEXT_CLASS );

        this.template = this._createTemplate();

        let context = this._createContext();
        this._draw( context );
    }

    _createTemplate() {
        return Handlebars.compile( this.source.innerHTML );
    }

    _draw( context ) {
        this.destination.innerHTML = this.template( context );
    }

    _createContext() {
        return Storage.selectedDealer;
    }
}

module.exports = CheckSelection;
