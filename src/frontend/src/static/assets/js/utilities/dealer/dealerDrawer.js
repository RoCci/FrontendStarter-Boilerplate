const Handlebars = require( 'handlebars' );

class DealerDrawer {
    constructor( source, destination ) {
        this.source = source;
        this.destination = destination;

        this.template = this._createTemplate();
    }

    _createTemplate() {
        return Handlebars.compile( this.source.innerHTML );
    }

    draw( context ) {
        this.destination.innerHTML = this.template( context );
    }

    addChangeEventListener( checkboxes, onCheck, onUncheck, afterChange ) {
        Array.from( checkboxes ).forEach( checkbox =>
            checkbox.addEventListener( 'change', e => this._change( e.target, onCheck, onUncheck, afterChange ) ) );
    }

    _change( checkbox, onCheck, onUncheck, afterChange ) {
        let data = checkbox.getAttribute( 'data-dealer' );
        let dataDealer = JSON.parse( data );
        dataDealer.dealerstring = data;

        if ( checkbox.checked ) {
            onCheck( dataDealer );
        }
        else {
            onUncheck( dataDealer );
        }

        afterChange();
    }

}

module.exports = DealerDrawer;
