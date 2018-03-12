const Storage = require( '../utilities/storage' );
const Checkbox = require( '../atoms/checkbox/checkbox' );

const LKW_CHECKBOX_NAME = 'productGroups[LKW]';
const PKW_CHECKBOX_NAME = 'productGroups[PKW]';
const TRANSPORTER_CHECKBOX_NAME = 'productGroups[Transporter]';
const TAXI_CHECKBOX_NAME = 'productGroups[Taxi]';

class ProductGroups {
    constructor( productGroupsElement ) {
        this.productGroupsElement = productGroupsElement;

        this.formData = Storage.formData;
        this.productGroupsValues = this.formData ? this.formData.productGroups : null;

        this._initCheckboxes();
    }

    _initCheckboxes() {
        this._initLkwCheckbox();
        this._initPkwCheckbox();
        this._initTransporterCheckbox();
        this._initTaxiCheckbox();
    }

    _initLkwCheckbox() {
        this.lkwCheckbox = new Checkbox( this.productGroupsElement, LKW_CHECKBOX_NAME );
        if ( this.productGroupsValues ) {
            this.lkwCheckbox.checked = this.productGroupsValues.groupLkw;
        }
    }

    _initPkwCheckbox() {
        this.pkwCheckbox = new Checkbox( this.productGroupsElement, PKW_CHECKBOX_NAME );
        if ( this.productGroupsValues ) {
            this.pkwCheckbox.checked = this.productGroupsValues.groupPkw;
        }
    }

    _initTransporterCheckbox() {
        this.transporterCheckbox = new Checkbox( this.productGroupsElement, TRANSPORTER_CHECKBOX_NAME );
        if ( this.productGroupsValues ) {
            this.transporterCheckbox.checked = this.productGroupsValues.groupTrapo;
        }
    }

    _initTaxiCheckbox() {
        this.taxiCheckbox = new Checkbox( this.productGroupsElement, TAXI_CHECKBOX_NAME );
        if ( this.productGroupsValues ) {
            this.taxiCheckbox.checked = this.productGroupsValues.groupTaxi;
        }
    }

    get() {
        return {
            groupLkw: this.lkwCheckbox.checked,
            groupPkw: this.pkwCheckbox.checked,
            groupTrapo: this.transporterCheckbox.checked,
            groupTaxi: this.taxiCheckbox.checked
        };
    }
}

module.exports = ProductGroups;
