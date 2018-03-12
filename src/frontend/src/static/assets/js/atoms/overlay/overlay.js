let isIndex = document.querySelectorAll( '.pageIndex' ).length;
if ( isIndex > 0 ) {
    document.getElementById( 'open' ).addEventListener( 'click', function() {
        document.getElementById( 'light' ).style.display = 'block';
        document.getElementById( 'fade' ).style.display = 'block';
    });

    document.getElementById( 'close' ).addEventListener( 'click', function() {
        document.getElementById( 'light' ).style.display = 'none';
        document.getElementById( 'fade' ).style.display = 'none';
    });
}

let footerLink = $( '.a-link--footer' );
let overlayContainer = $( '.metapages-page' );
let closeLink = $( '.button-close' );

footerLink.on( 'click', function() {
    let overlayID = $( this ).attr( 'ID' );
    document.getElementById( overlayID ).style.display = 'block';
    document.getElementById( 'overlay' ).style.display = 'block';
});

closeLink.on( 'click', function() {
    $( overlayContainer ).hide();
    document.getElementById( 'overlay' ).style.display = 'none';
});
