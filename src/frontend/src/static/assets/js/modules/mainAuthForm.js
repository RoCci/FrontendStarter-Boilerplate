const RestClient = require( '../utilities/restClient' );
const Storage = require( '../utilities/storage' );
const Button = require( '../atoms/button/button' );

const Container = require( '../atoms/error-container/error-container' );

const SEND_BUTTON_NAME = 'button_Send';


const AUTH_NUMBER = 'Unternehmer-Abrechnungsnummer';


class MainAuthForm {
    constructor( mainAuthFormElement ) {
        this.mainAuthFormElement = mainAuthFormElement;
        this.restClient = new RestClient();

        this.formData = Storage.formData;

        this._initInputs();
    }

    _initAtoms() {
        this._initSendButton();
    }

    _initInputs() {
          this._initCityTextbox();
          this._initCompanyNameTextbox();
          this._initEmailTextbox();
          this._initFirstNameTextbox();
          this._initHouseNumberTextbox();
          this._initLastNameTextbox();
          this._initStreetTextbox();
          this._initZipCodeTextbox();
          this._initHerrRadiobutton();
          this._initFrauRadiobutton();
      }

    _initSendButton() {
        this.sendButton = new Button( this.mainAuthFormElement, SEND_BUTTON_NAME );
        this.sendButton.addClickEventListener( this._click.bind( this ) );
    }

    _click() {
          this._validateUserDataAndGoToNextPage();
    }

    async _validateUserDataAndGoToNextPage() {
        let formData = {
            partnerData: this.partnerData.get() };

        try {
            await this.restClient.validateAuthenticationNumber( formData.partnerData );

            Storage.formData = formData;
            window.location.href = '/dealer';
        }
        catch ( validationMessages ) {
            // TODO: MBVDODTTN-134
            alert( JSON.stringify( validationMessages ) );
        }
    }
}

module.exports = MainAuthForm;
