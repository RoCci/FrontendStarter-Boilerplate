const Handlebars = require( 'handlebars' );
const Storage = require( '../utilities/storage' );

const CHECKPRODUCTGROUPS_TEMPLATE = '#checkProductGroups-template';
const CHECKPRODUCTGROUPS_TEXT_CLASS = '.js-checkProductGroups__text';

class CheckProductGroups {
    constructor() {
        this.source = document.querySelector( CHECKPRODUCTGROUPS_TEMPLATE );
        this.destination = document.querySelector( CHECKPRODUCTGROUPS_TEXT_CLASS );

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
        let productGroups = Storage.formData.productGroups;

        let selectedProductGroups = [];

        if ( productGroups.groupLkw ) {
            selectedProductGroups.push( 'Lkw' );
        }
        if ( productGroups.groupPkw ) {
            selectedProductGroups.push( 'Pkw' );
        }
        if ( productGroups.groupTaxi ) {
            selectedProductGroups.push( 'Taxi' );
        }
        if ( productGroups.groupTrapo ) {
            selectedProductGroups.push( 'Trapo' );
        }

        return selectedProductGroups;
    }
}

module.exports = CheckProductGroups;
