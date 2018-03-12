const DealerSelected = require( './dealerSelected' );
const DealerDrawer = require( '../utilities/dealer/dealerDrawer' );
const OutletDaoModificator = require( '../utilities/dealer/outletDaoModificator' );

const DEALERSELECTION_CLASS = '.js-dealerSelection';
const DEALERSELECTION_INPUT_CLASS = '.js-dealerSelection__input';
const DEALERSELECTION_TEMPLATE = '#dealerSelection-template';
const DEALERSELECTION_IN_BACK_CLASS = 'p-dealerSelection--in-back';
const DEALERSELECTED_CLASS = '.js-dealerSelected';

class DealerSelection extends DealerDrawer {
    constructor( dealerSelectionElement ) {
        let sourceElement = document.querySelector( DEALERSELECTION_TEMPLATE );
        super( sourceElement, dealerSelectionElement );

        this.dealerSelected = this._initDealerSelected();
    }

    _initDealerSelected() {
        let dealerSelectedElement = document.querySelector( DEALERSELECTED_CLASS );
        if ( dealerSelectedElement ) {
            return new DealerSelected( dealerSelectedElement );
        }
    }

    draw( context ) {
        OutletDaoModificator.modify( context.outletDAO );

        super.draw( context );

        let checkboxes = document.querySelectorAll( DEALERSELECTION_INPUT_CLASS );
        super.addChangeEventListener( checkboxes,
            this.dealerSelected.add.bind( this.dealerSelected ),
            this.dealerSelected.remove.bind( this.dealerSelected ),
            this.dealerSelected.refresh.bind( this.dealerSelected ) );

        this.dealerSelected.loadSelected();
    }

    show() {
        let dealerSelectionElement = document.querySelector( DEALERSELECTION_CLASS );
        if ( dealerSelectionElement ) {
            dealerSelectionElement.classList.remove( DEALERSELECTION_IN_BACK_CLASS );
        }
    }

    hide() {
        let dealerSelectionElement = document.querySelector( DEALERSELECTION_CLASS );
        if ( dealerSelectionElement ) {
            dealerSelectionElement.classList.add( DEALERSELECTION_IN_BACK_CLASS );
        }
    }
}

module.exports = DealerSelection;
