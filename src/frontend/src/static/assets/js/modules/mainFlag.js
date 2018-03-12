
class MainFlag {
    constructor( mainFlagElement ) {
        this.mainFlagElement = mainFlagElement;

        this._textToggle();
    }

    _textToggle() {
        const textElementToggle = document.querySelector( '.textElementToggle' );
        var istextElementToggle = document.querySelectorAll( '.js-mainFlagToggle' ).length;
        if ( istextElementToggle > 0 ) {
            document.querySelector( '.titleClickTarget' ).addEventListener( 'click', function() {
                if ( textElementToggle.style.display === 'none' ) {
                    textElementToggle.style.display = 'block';
                }
                else {
                    textElementToggle.style.display = 'none';
                }
            });
        }
    }
}

module.exports = MainFlag;
