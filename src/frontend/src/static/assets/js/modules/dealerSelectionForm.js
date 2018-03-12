const Button = require( '../atoms/button/button' );
const Storage = require( '../utilities/storage' );
const Container = require( '../atoms/error-container/error-container' );

const DealerSearch = require( '../partials/dealerSearch' );
const DealerSelection = require( '../partials/dealerSelection' );
const DealerSelectionIcon = require( '../partials/dealerSelectionIcon' );

const PREVIOUS_BUTTON_NAME = 'button_Previous';
const NEXT_BUTTON_NAME = 'button_Next';
const DEALERSELECTION_CLASS = '.js-dealerSelection';
const DEALERSELECTIONICON_CLASS = '.js-dealerSelectionIcon';
const DEALERSEARCH_CLASS = '.js-dealerSearch';

class DealerSelectionForm {
    constructor( dealerSelectionFormElement ) {
        this.dealerSelectionFormElement = dealerSelectionFormElement;

        this._initAtoms();
        this._initPartials();
    }

    _initAtoms() {
        this._addPreviousButton();
        this._addNextButton();
    }

    _addPreviousButton() {
        this.previousButton = new Button( this.dealerSelectionFormElement, PREVIOUS_BUTTON_NAME );
        this.previousButton.addClickEventListener( () => window.location.href = '/' );
    }

    _addNextButton() {
        this.nextButton = new Button( this.dealerSelectionFormElement, NEXT_BUTTON_NAME );
        this.nextButton.addClickEventListener( this._click.bind( this ) );
    }

    _click() {
        if ( Storage.selectedDealer && Storage.selectedDealer.length > 0 ) {
            Container.removeContainerError();
            window.location.href = '/check';
        }
        else {
            this.dealerSelectionIcon.showError();
            Container.addContainerError();
        }
    }

    _initPartials() {
        let dealerSelection = this._initDealerSelection();
        this.dealerSelectionIcon = this._initDealerSelectionIcon( dealerSelection );
        this._initDealerSearch( dealerSelection );
    }

    _initDealerSelection() {
        let dealerSelectionElement = this.dealerSelectionFormElement.querySelector( DEALERSELECTION_CLASS );
        if ( dealerSelectionElement ) {
            return new DealerSelection( dealerSelectionElement );
        }
    }

    _initDealerSelectionIcon( dealerSelection ) {
        let dealerSelectionIconElement = this.dealerSelectionFormElement.querySelector( DEALERSELECTIONICON_CLASS );
        if ( dealerSelectionIconElement && dealerSelection ) {
            return new DealerSelectionIcon( dealerSelectionIconElement, dealerSelection );
        }
    }

    _initDealerSearch( dealerSelection ) {
        let dealerSearchElement = this.dealerSelectionFormElement.querySelector( DEALERSEARCH_CLASS );
        if ( dealerSearchElement && dealerSelection ) {
            return new DealerSearch( dealerSearchElement, dealerSelection );
        }
    }
}

module.exports = DealerSelectionForm;
