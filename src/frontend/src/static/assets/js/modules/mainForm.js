const RestClient = require( '../utilities/restClient' );
const Storage = require( '../utilities/storage' );
const Textbox = require( '../atoms/textbox/textbox' );
const Checkbox = require( '../atoms/checkbox/checkbox' );
const Radiobutton = require( '../atoms/radiobutton/radiobutton' );
const Button = require( '../atoms/button/button' );
const Container = require( '../atoms/error-container/error-container' );

const PersonalData = require( '../partials/personalData' );
const ProductGroups = require( '../partials/productGroups' );

const SEND_BUTTON_NAME = 'button_Send';
const PERSONALDATA_CLASS = '.js-personalData';
const PRODUCTGROUPS_CLASS = '.js-productGroups';

class MainForm {
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
        this._initPersonalData();
        this._initProductGroups();
    }

    _initPersonalData() {
        let personalDataElement = this.mainFormElement.querySelector( PERSONALDATA_CLASS );
        if ( personalDataElement ) {
            this.personalData = new PersonalData( personalDataElement );
        }
    }

    _initProductGroups() {
        let productGroupsElement = this.mainFormElement.querySelector( PRODUCTGROUPS_CLASS );
        if ( productGroupsElement ) {
            this.productGroups = new ProductGroups( productGroupsElement );
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
            personalData: this.personalData.get(),
            productGroups: this.productGroups.get()
        };

        try {
            await this.restClient.validateUserData( formData.personalData );

            Storage.formData = formData;
            window.location.href = '/dealer';
        }
        catch ( validationMessages ) {
            // TODO: MBVDODTTN-134
            alert( JSON.stringify( validationMessages ) );
        }
    }
}

module.exports = MainForm;
