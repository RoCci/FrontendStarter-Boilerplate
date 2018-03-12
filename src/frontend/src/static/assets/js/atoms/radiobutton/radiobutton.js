class Radiobutton {
    constructor( rootElement, radiobuttonInputId ) {
        this.radiobuttonInputElement = rootElement.querySelector( '#' + radiobuttonInputId );
    }

    get checked() {
        return this.radiobuttonInputElement.checked;
    }

    set checked( checked ) {
        this.radiobuttonInputElement.checked = checked;
    }

    static toggleRadiobuttonErrorBeforSubmit() {
        let radiobuttonList = document.querySelectorAll( '.js-radiobutton-description' );
        for ( let i = 0; i < radiobuttonList.length; i++ ) {
            radiobuttonList[ i ].classList.toggle( 'a-radiobutton-description--error', !this.validateItems() );
        }
    }

    static toggleRadiobuttonError() {
        this.toggleRadiobuttonErrorBeforSubmit( this );
        for ( let radiobuttonElement of document.querySelectorAll( '.js-radiobutton__input' ) ) {
            radiobuttonElement.addEventListener( 'click', this.toggleRadiobuttonErrorBeforSubmit.bind( this ) );
        }
    }

    static validateItems() {
        let checked = false;
        let anrede = document.getElementsByName( 'Anrede' );
        for ( let i = 0; i < anrede.length; i++ ) {
            if ( anrede[ i ].checked ) {
                checked = true;
            }
        }
        return checked;
    }
}

module.exports = Radiobutton;
