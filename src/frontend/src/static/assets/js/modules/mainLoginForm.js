const RestClient = require( '../utilities/restClient' );
const Storage = require( '../utilities/storage' );
const Textbox = require( '../atoms/textbox/textbox' );
const Checkbox = require( '../atoms/checkbox/checkbox' );
const Radiobutton = require( '../atoms/radiobutton/radiobutton' );
const Button = require( '../atoms/button/button' );
const Container = require( '../atoms/error-container/error-container' );

const LoginData = require( '../partials/loginData' );

const SEND_BUTTON_NAME = 'button_Send';
const LOGINDATA_CLASS = '.js-loginData';

class MainLoginForm {
    constructor( mainFormElement ) {
        this.mainFormElement = mainFormElement;
        this.restClient = new RestClient();

        this._initAtoms();
        this._initPartials();
    }

    _initAtoms() {
        this._initSendButton();
    }

    _initSendButton() {
        this.sendButton = new Button( this.mainFormElement, SEND_BUTTON_NAME );
        this.sendButton.addClickEventListener( this._click.bind( this ) );
    }

    _initPartials() {
        this._initLoginData();
    }

    _initPersonalData() {
        let loginDataElement = this.mainFormElement.querySelector( LOGINDATA_CLASS );
        if ( loginDataElement ) {
            this.loginData = new LoginData( loginDataElement );
        }
    }

    _click() {
        let isValidTextbox = Textbox.validateItems();
        let isValidCheckbox = Checkbox.validateItems();
        let isValidRadiobutton = Radiobutton.validateItems();

        if ( isValidTextbox && isValidCheckbox && isValidRadiobutton ) {
            Container.removeContainerError();
            Radiobutton.toggleRadiobuttonError();
            Checkbox.toggleCheckboxError();

            this._validateUserDataAndGoToNextPage();
        }
        else {
            Container.addContainerError();
            Radiobutton.toggleRadiobuttonError();
            Textbox.addTextboxError();
            Checkbox.toggleCheckboxError();
        }
    }

    async _validateUserDataAndGoToNextPage() {
        let formData = {
            loginData: this.loginData.get() };

        try {
            await this.restClient.validateUserData( formData.loginData );

            Storage.formData = formData;
            window.location.href = '/dealer';
        }
        catch ( validationMessages ) {
            // TODO: MBVDODTTN-134
            alert( JSON.stringify( validationMessages ) );
        }
    }
}

module.exports = MainLoginForm;
