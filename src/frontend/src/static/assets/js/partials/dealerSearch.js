const RestClient = require( '../utilities/restClient' );
const Storage = require( '../utilities/storage' );
const Validator = require( '../utilities/validator' );
const Textbox = require( '../atoms/textbox/textbox' );
const Button = require( '../atoms/button/button' );
const Container = require( '../atoms/error-container/error-container' );

const DEALERSEARCH_BUTTON_NAME = 'button_dealerSearch';
const ZIPCODE_TEXTBOX_NAME = 'PLZ';

class DealerSearch {
    constructor( dealerSearchElement, dealerSelection ) {
        this.dealerSearchElement = dealerSearchElement;
        this.dealerSelection = dealerSelection;

        this.restClient = new RestClient();
        this.formData = Storage.formData;

        this._initUtils();
        this._requestDealerAndDrawThem();
    }

    _initUtils() {
        this._initZipCodeTextbox();
        this._initDealerSearchButton();
    }

    _initZipCodeTextbox() {
        this.zipCodeTextbox = new Textbox( this.dealerSearchElement, ZIPCODE_TEXTBOX_NAME );
        if ( this.formData.personalData ) {
            this.zipCodeTextbox.value = this.formData.personalData.zipCode;
        }
        this.zipCodeTextbox.useSpecificValidation( Validator.isPLZ );
    }

    _initDealerSearchButton() {
        this.dealerSearchButton = new Button( this.dealerSearchElement, DEALERSEARCH_BUTTON_NAME );
        this.dealerSearchButton.addClickEventListener( this._search.bind( this ) );
    }

    _search() {
        let isValidPLZ = Validator.isPLZ( this.zipCodeTextbox.value );
        if ( isValidPLZ ) {
            Container.removeContainerError();
            this._requestDealerAndDrawThem();
        }
        else {
            Container.addContainerError();
            Textbox.addTextboxError();
        }
    }

    async _requestDealerAndDrawThem() {
        this.formData.personalData.zipCode = parseInt( this.zipCodeTextbox.value );
        let dealerData = {
            carType: this.formData.productGroups,
            zipCode: this.formData.personalData.zipCode
        };

        try {
            const dealer = await this.restClient.requestDealer( dealerData );

            Storage.formData = this.formData;
            this.dealerSelection.draw( dealer );
        }
        catch ( validationMessages ) {
            // TODO: MBVDODTTN-133
            alert( JSON.stringify( validationMessages ) );
        }
    }
}

module.exports = DealerSearch;
