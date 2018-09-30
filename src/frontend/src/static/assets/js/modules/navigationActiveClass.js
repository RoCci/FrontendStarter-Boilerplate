class NavigationActiveClass {
    constructor( navigationActiveClassElement ) {
        this.navigationActiveClassElement = navigationActiveClassElement;
        this._addActiveClass();
    }

    _addActiveClass() {
        let url = window.location.pathname;
        let activePage;
        activePage = url.substring( url.lastIndexOf( '/' ) + 1 );
        console.log( url, activePage );
        // language=JQuery-CSS
        $( '.primary-nav li a' ).each( function() {
            let linkPage = this.href.substring( this.href.lastIndexOf( '/' ) + 1 );
            if ( activePage === linkPage ) {
                $( this ).parent().addClass( 'active' );
            }
        });
    }
}

module.exports = NavigationActiveClass;
