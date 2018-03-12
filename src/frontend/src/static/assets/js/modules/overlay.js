
let footerLink = $( '.a-link--footer' );
let overlayContainer = $( '.metapages-page' );
let closeLink = $( '.button-white' );

footerLink.on( 'click', function() {
    let overlayID = $( this ).attr( 'data-url' );
    document.getElementById( overlayID ).style.display = 'block';
    document.getElementById( 'overlay' ).style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeLink.on( 'click', function() {
    $( overlayContainer ).hide();
    document.getElementById( 'overlay' ).style.display = 'none';
    document.body.style.overflow = 'auto';
});
