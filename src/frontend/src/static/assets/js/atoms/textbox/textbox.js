const Validator = require( '../../utilities/validator' );

class Textbox {
    /**
     * This constructor extracts the textboxElement, textboxInputElement and the textboxLabelElement
     * from the passed rootElement + textboxInputName
     * @param rootElement [required] The rootElement that definitely has an input element in it
     * @param textboxInputId [required] The textboxInputId that identifies the <input> Element
     */
    constructor( rootElement, textboxInputId ) {
        this.textboxInputElement = rootElement.querySelector( 'input[id="' + textboxInputId + '"' );
        if ( this.textboxInputElement != null ) {
            this.textboxElement = this.textboxInputElement.parentElement;
            this.textboxLabelElement = this.textboxElement.querySelector( '.js-textbox__label' );

            this._addInputEventListener();
            this._useDefaultValidation();
        }
    }

    get value() {
        return this.textboxInputElement.value;
    }

    set value( value ) {
        this.textboxInputElement.value = value;
        this._toggleLabel();
    }

    _useDefaultValidation() {
        this.validationDefaultMethod = Validator.isNotEmpty;
    }

    useSpecificValidation( validationMethod ) {
        this.validationMethod = validationMethod;
    }

    _addInputEventListener() {
        this.textboxInputElement.addEventListener( 'input', this._input.bind( this ) );
    }

    _input() {
        this._toggleTextboxError();
        this._toggleLabel();
    }

    _toggleTextboxError() {
        this.textboxElement.classList.toggle( 'a-textbox--error',
            !!this.validationDefaultMethod && !this.validationDefaultMethod( this.value ) ||
            !!this.validationMethod && !this.validationMethod( this.value ) );
    }

    _toggleLabel() {
        this.textboxLabelElement.classList.toggle( 'show', Validator.isNotEmpty( this.value ) );
    }

    static addTextboxError() {
        for ( let textboxInputElement of document.querySelectorAll( '.js-textbox .a-textbox__input' ) ) {
            if ( textboxInputElement.value === '' ) {
                textboxInputElement.parentElement.classList.add( 'a-textbox--error' );
            }
        }
    }

    static validateItems() {
        let checked = false;
        let emptyTextbox = [];
        for ( let textboxInputElement of document.querySelectorAll( '.js-textbox .a-textbox__input' ) ) {
            if ( !Validator.isNotEmpty( textboxInputElement.value ) ) {
                emptyTextbox.push( textboxInputElement );
            }
        }
        if ( emptyTextbox.length === 0 ) {
            checked = true;
        }

        return checked;
    }
}

module.exports = Textbox;
