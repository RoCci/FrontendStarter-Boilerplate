class Checkbox {
    constructor( rootElement, checkboxInputName ) {
        this.checkboxInputElement = rootElement.querySelector( 'input[name="' + checkboxInputName + '"]' );
    }

    get checked() {
        return this.checkboxInputElement.checked;
    }

    set checked( checked ) {
        this.checkboxInputElement.checked = checked;
    }

    static toggleCheckboxErrorOld() {
        let checked = document.querySelectorAll( '.js-checkbox .a-checkbox__input:checked' );
        let checkboxListe = document.querySelectorAll( '.js-checkbox .a-checkbox__input' );
        for ( let i = 0; i < checkboxListe.length; i++ ) {
            checkboxListe[ i ].parentElement.classList.toggle( 'a-checkbox--error', checked.length === 0 );
        }
    }

    static toggleCheckboxError() {
        this.toggleCheckboxErrorOld( this );
        let checkboxListe = document.querySelectorAll( '.js-checkbox .a-checkbox__input' );
        for ( let i = 0; i < checkboxListe.length; i++ ) {
            checkboxListe[ i ].addEventListener( 'click', function() {
                let checked = document.querySelectorAll( '.js-checkbox .a-checkbox__input:checked' );
                if ( checked.length === 0 ) {
                    for ( let i = 0; i < checkboxListe.length; i++ ) {
                        checkboxListe[ i ].parentElement.classList.add( 'a-checkbox--error' );
                    }
                }
                else {
                    for ( let i = 0; i < checkboxListe.length; i++ ) {
                        checkboxListe[ i ].parentElement.classList.remove( 'a-checkbox--error' );
                    }
                }
            } );
        }
    }

    static addCheckboxError() {
        if ( document.querySelectorAll( '.js-checkbox .a-checkbox__input:checked' ).length === 0 ) {
            let checkboxListe = document.querySelectorAll( '.js-checkbox .a-checkbox__input' );
            for ( let i = 0; i < checkboxListe.length; i++ ) {
                checkboxListe[ i ].parentElement.classList.add( 'a-checkbox--error' );
            }
        }
    }

    static validateItems() {
        let checked = false;
        if ( document.querySelectorAll( '.js-checkbox .a-checkbox__input:checked' ).length > 0 ) {
            checked = true;
        }
        return checked;
    }
}

module.exports = Checkbox;
