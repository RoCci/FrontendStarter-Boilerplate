const Storage = require( '../utilities/storage' );
const Validator = require( '../utilities/validator' );
const Textbox = require( '../atoms/textbox/textbox' );

const HERMES_UA_NUMMER_NAME = 'Unternehmer-Abrechnungsnummer';


class PartnerData {
    constructor( personalDataElement ) {
        this.personalDataElement = personalDataElement;

        this.formData = Storage.formData;
        this.personalDataValues = this.formData ? this.formData.personalData : null;

        this._initInputs();
    }

    _initStreetTextbox() {
        this.streetTextbox = new Textbox( this.personalDataElement, STREET_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.streetTextbox.value = this.personalDataValues.street;
        }
    }

    get() {
        return {
            city: this.cityTextbox.value,
            companyName: this.companyNameTextbox.value,
            email: this.emailTextbox.value,
            firstName: this.firstNameTextbox.value,
            houseNumber: this.houseNumberTextbox.value,
            lastName: this.lastNameTextbox.value,
            street: this.streetTextbox.value,
            zipCode: parseInt( this.zipCodeTextbox.value )
        };
    }
}

module.exports = PartnerData;
