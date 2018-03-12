const Handlebars = require( 'handlebars' );
const Storage = require( '../utilities/storage' );

const Anrede = require( '../finals' ).Anrede;

const CHECKPERSONALDATA_TEMPLATE = '#checkPersonalData-template';
const CHECKPERSONALDATA_TEXT_CLASS = '.js-checkPersonalData__text';

class CheckPersonalData {
    constructor() {
        this.source = document.querySelector( CHECKPERSONALDATA_TEMPLATE );
        this.destination = document.querySelector( CHECKPERSONALDATA_TEXT_CLASS );

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
        let personalData = Storage.formData.personalData;

        personalData.gender = personalData.gender === Anrede.Herr ? 'Herr' : 'Frau';

        return personalData;
    }
}

module.exports = CheckPersonalData;
