class DealerSelectionIcon {
    constructor( dealerSelectionIconElement, dealerSelection ) {
        this.dealerSelection = dealerSelection;
        this.dealerSelectionIconElement = dealerSelectionIconElement;

        this._addEventListener();
    }

    showError() {
        this.dealerSelectionIconElement.setAttribute( 'data-count', '0' );
    }

    _addEventListener() {
        this._addClickEventListener();
    }

    _addClickEventListener() {
        this.isDealerSelectedVisible = false;
        this.dealerSelectionIconElement.addEventListener( 'click', this._click.bind( this ) );
    }

    _click( e ) {
        e.preventDefault();
        this._toggleViews();
    }

    _toggleViews() {
        if ( !this.isDealerSelectedVisible ) {
            this.dealerSelection.dealerSelected.draw();
            this.dealerSelection.dealerSelected.show();
            this.dealerSelection.hide();
        }
        else {
            this.dealerSelection.dealerSelected.hide();
            this.dealerSelection.show();
        }

        this.isDealerSelectedVisible = !this.isDealerSelectedVisible;
    }
}

module.exports = DealerSelectionIcon;
