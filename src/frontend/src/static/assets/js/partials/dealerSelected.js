const DealerDrawer = require( '../utilities/dealer/dealerDrawer' );
const Storage = require( '../utilities/storage' );

const DEALERSELECTED_CLASS = '.js-dealerSelected';
const DEALERSELECTED_INPUT_CLASS = '.js-dealerSelected__input';
const DEALERSELECTED_TEMPLATE = '#dealerSelected-template';
const DEALERSELECTIONICON_CLASS = '.js-dealerSelectionIcon';
const DEALERSELECTED_HIDDEN_CLASS = 'p-dealerSelected--hidden';
const DEALERSELECTED_ITEM_ID_PREFIX = '#dealer-';

class DealerSelected extends DealerDrawer {
    constructor( dealerSelectedElement ) {
        let sourceElement = document.querySelector( DEALERSELECTED_TEMPLATE );
        super( sourceElement, dealerSelectedElement );

        this._init();
    }

    _init() {
        this._isInitialDataCount = true;

        this._initArray();
        this.refresh();
    }

    _initArray() {
        this.selectedDealerArray = Storage.selectedDealer ? Storage.selectedDealer : [];
    }

    add( dealer ) {
        this.selectedDealerArray.push( dealer );
    }

    remove( dealer ) {
        this.selectedDealerArray.filter( item => {
            return item.outletcode === dealer.outletcode;
        } ).forEach( itemToRemove => {
            this.selectedDealerArray.splice( this.selectedDealerArray.indexOf( itemToRemove ), 1 );
        } );
    }

    _uncheckFromDealerSelection( dealer ) {
        let dealerInputElement = document.querySelector( DEALERSELECTED_ITEM_ID_PREFIX + dealer.outletcode );
        if ( dealerInputElement ) {
            dealerInputElement.checked = false;
        }
    }

    refresh() {
        this._setDataCount();
        this._setDealerSelectedIntoStorage();
    }

    loadSelected() {
        for ( let dealer of this.selectedDealerArray ) {
            let dealerInputElement = document.querySelector( DEALERSELECTED_ITEM_ID_PREFIX + dealer.outletcode );
            if ( dealerInputElement ) {
                dealerInputElement.checked = true;
            }
        }
    }

    _isInitialDataCountZero() {
        let isInitZero = this._isInitialDataCount && this.selectedDealerArray.length === 0;

        this._isInitialDataCount = false;

        return isInitZero;
    }

    _setDataCount() {
        let dealerSelectionIconElement = document.querySelector( DEALERSELECTIONICON_CLASS );
        dealerSelectionIconElement.setAttribute( 'data-count',
            this._isInitialDataCountZero() ? '-1' : this.selectedDealerArray.length.toString() );
    }

    _setDealerSelectedIntoStorage() {
        Storage.selectedDealer = this.selectedDealerArray;
    }

    draw() {
        super.draw( Storage.selectedDealer );

        let checkboxes = document.querySelectorAll( DEALERSELECTED_INPUT_CLASS );
        super.addChangeEventListener( checkboxes,
            this.add.bind( this ),
            function( dealer ) {
                this.remove( dealer );
                this._uncheckFromDealerSelection( dealer );
            }.bind( this ),
            this.refresh.bind( this ) );
    }

    show() {
        let dealerSelectedElement = document.querySelector( DEALERSELECTED_CLASS );
        if ( dealerSelectedElement ) {
            dealerSelectedElement.classList.remove( DEALERSELECTED_HIDDEN_CLASS );
        }
    }

    hide() {
        let dealerSelectedElement = document.querySelector( DEALERSELECTED_CLASS );
        if ( dealerSelectedElement ) {
            dealerSelectedElement.classList.add( DEALERSELECTED_HIDDEN_CLASS );
        }
    }
}

module.exports = DealerSelected;
