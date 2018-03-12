
class CookieLayer {
    constructor( cookieLayerElement ) {
        this.cookieLayerElement = cookieLayerElement;

        this._addCookieLayer();
        this._setCookie();
    }

    _addCookieLayer() {
        if ( document.cookie.indexOf( 'MBLPP_cookieAccept' ) !== -1 ) {
            $( '#cookieLayer' ).hide();
            $( '.overlay--bg-full' ).hide();
        }
        else {
            $( '.overlay--bg' ).show();
            $( '#cookieLayer' ).show();
            $( '#cookieLayerCloser' ).show();
        }
    }
    _setCookie() {
        $( 'a#cookieLayerCloser' ).click(function() {
            document.cookie = 'MBLPP_cookieAccept; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;';
            $( '#cookieLayer' ).slideUp();
            $( '.overlay--bg' ).hide();
        });
    }
}

module.exports = CookieLayer;
