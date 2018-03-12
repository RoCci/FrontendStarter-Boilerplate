const Storage = require( '../utilities/storage' );
const Validator = require( '../utilities/validator' );
const Textbox = require( '../atoms/textbox/textbox' );
const Radiobutton = require( '../atoms/radiobutton/radiobutton' );

const Anrede = require( '../finals' ).Anrede;

const CITY_TEXTBOX_NAME = 'Ort';
const COMPANY_TEXTBOX_NAME = 'Firma';
const EMAIL_TEXTBOX_NAME = 'E-Mail-Adresse';
const FIRSTNAME_TEXTBOX_NAME = 'Vorname';
const HOUSENUMBER_TEXTBOX_NAME = 'Nr.';
const LASTNAME_TEXTBOX_NAME = 'Nachname';
const STREET_TEXTBOX_NAME = 'Straße';
const ZIPCODE_TEXTBOX_NAME = 'PLZ';
const HERR_RADIOBUTTON_NAME = 'Herr';
const FRAU_RADIOBUTTON_NAME = 'Frau';

class PartnerData {
    constructor( personalDataElement ) {
        this.personalDataElement = personalDataElement;

        this.formData = Storage.formData;
        this.personalDataValues = this.formData ? this.formData.personalData : null;

        this._initInputs();
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

    _initCityTextbox() {
        this.cityTextbox = new Textbox( this.personalDataElement, CITY_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.cityTextbox.value = this.personalDataValues.city;
        }
    }

    _initCompanyNameTextbox() {
        this.companyNameTextbox = new Textbox( this.personalDataElement, COMPANY_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.companyNameTextbox.value = this.personalDataValues.companyName;
        }
    }

    _initEmailTextbox() {
        this.emailTextbox = new Textbox( this.personalDataElement, EMAIL_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.emailTextbox.value = this.personalDataValues.email;
        }
        this.emailTextbox.useSpecificValidation( Validator.isEmail );
    }

    _initFirstNameTextbox() {
        this.firstNameTextbox = new Textbox( this.personalDataElement, FIRSTNAME_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.firstNameTextbox.value = this.personalDataValues.firstName;
        }
    }

    _initHouseNumberTextbox() {
        this.houseNumberTextbox = new Textbox( this.personalDataElement, HOUSENUMBER_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.houseNumberTextbox.value = this.personalDataValues.houseNumber;
        }
    }

    _initLastNameTextbox() {
        this.lastNameTextbox = new Textbox( this.personalDataElement, LASTNAME_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.lastNameTextbox.value = this.personalDataValues.lastName;
        }
    }

    _initStreetTextbox() {
        this.streetTextbox = new Textbox( this.personalDataElement, STREET_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.streetTextbox.value = this.personalDataValues.street;
        }
    }

    _initZipCodeTextbox() {
        this.zipCodeTextbox = new Textbox( this.personalDataElement, ZIPCODE_TEXTBOX_NAME );
        if ( this.personalDataValues ) {
            this.zipCodeTextbox.value = this.personalDataValues.zipCode;
        }
        this.zipCodeTextbox.useSpecificValidation( Validator.isPLZ );
    }

    _initHerrRadiobutton() {
        this.herrRadiobutton = new Radiobutton( this.personalDataElement, HERR_RADIOBUTTON_NAME );
        if ( this.personalDataValues ) {
            this.herrRadiobutton.checked = this.personalDataValues.gender === Anrede.Herr;
        }
    }

    _initFrauRadiobutton() {
        this.frauRadiobutton = new Radiobutton( this.personalDataElement, FRAU_RADIOBUTTON_NAME );
        if ( this.personalDataValues ) {
            this.frauRadiobutton.checked = this.personalDataValues.gender === Anrede.Frau;
        }
    }

    get() {
        return {
            city: this.cityTextbox.value,
            companyName: this.companyNameTextbox.value,
            email: this.emailTextbox.value,
            firstName: this.firstNameTextbox.value,
            gender: this.herrRadiobutton.checked ? Anrede.Herr : Anrede.Frau,
            houseNumber: this.houseNumberTextbox.value,
            lastName: this.lastNameTextbox.value,
            street: this.streetTextbox.value,
            zipCode: parseInt( this.zipCodeTextbox.value )
        };
    }
}

module.exports = PartnerData;
