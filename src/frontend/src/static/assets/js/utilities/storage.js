class Storage {
    static get formData() {
        return this._getElement( 'formData' );
    }

    static set formData( value ) {
        this._setElement( 'formData', value );
    }

    static clear() {
        localStorage.clear();
    }

    static _getElement( elementName ) {
        return JSON.parse( localStorage.getItem( elementName ) );
    }

    static _setElement( elementName, value ) {
        localStorage.setItem( elementName, JSON.stringify( value ) );
    }
}

module.exports = Storage;
