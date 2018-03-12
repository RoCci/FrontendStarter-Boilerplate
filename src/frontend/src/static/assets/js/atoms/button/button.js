class Button {
    constructor( rootElement, buttonName ) {
        this.button = rootElement.querySelector( 'input[name="' + buttonName + '"]' );
    }

    addClickEventListener( onClick ) {
        this.button.addEventListener( 'click', onClick );
    }

    addSubmitEventListener( onSubmit ) {
        this.button.addEventListener( 'submit', onSubmit );
    }
}

module.exports = Button;
