class ErrorContainer {
    static addContainerError() {
        for ( let container of document.querySelectorAll( '.js-error-container' ) ) {
            container.classList.remove( 'a-error-container--hidden' );
        }
    }

    static removeContainerError() {
        for ( let container of document.querySelectorAll( '.js-error-container' ) ) {
            container.classList.add( 'a-error-container--hidden' );
        }
    }
}

module.exports = ErrorContainer;
