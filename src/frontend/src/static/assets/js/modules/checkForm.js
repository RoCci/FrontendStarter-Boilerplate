const RestClient = require( '../utilities/restClient' );
const Storage = require( '../utilities/storage' );

const Button = require( '../atoms/button/button' );

const Container = require( '../atoms/error-container/error-container' );

const SEND_BUTTON_NAME = 'button_Send';


const AUTH_NUMBER = 'Unternehmer-Abrechnungsnummer';

class CheckForm {
    constructor( checkFormElement ) {
        this.checkFormElement = checkFormElement;
        this.restClient = new RestClient();
        this.formData = Storage.formData;
        this._initSendButton();


    }
    _initAtoms() {
        this._initSendButton();
    }


    _initSendButton() {
        this.sendButton = new Button( this.checkFormElement, SEND_BUTTON_NAME );
        this.sendButton.addClickEventListener( this._click.bind( this ) );
    }

    _click() {
        this._validateAuthenticationNumberAndgotoRegForm();
    }

    async _validateAuthenticationNumberAndgotoRegForm() {
        let data = 666666;
        try {
            await this.restClient.validateAuthenticationNumber( data );

            // window.location.href = '/thanks';
            Storage.clear();
        }
        catch ( validationMessages ) {
            // TODO ...
            alert( JSON.stringify( validationMessages ) );
        }
    }

    _initPartials() {
        this._initCheckPersonalData();
        this._initCheckProductGroups();
        this._initCheckSelection();
    }

    _initCheckPersonalData() {
        let checkPersonalDataElement = this.checkFormElement.querySelector( CHECKPERSONALDATA_CLASS );
        if ( checkPersonalDataElement ) {
            return new CheckPersonalData();
        }
    }

    _initCheckProductGroups() {
        let checkProductGroupsElement = this.checkFormElement.querySelector( CHECKPRODUCTGROUPS_CLASS );
        if ( checkProductGroupsElement ) {
            return new CheckProductGroups();
        }
    }

    _initCheckSelection() {
        let checkSelectionElement = this.checkFormElement.querySelector( CHECKSELECTION_CLASS );
        if ( checkSelectionElement ) {
            return new CheckSelection();
        }
    }
}

module.exports = CheckForm;
