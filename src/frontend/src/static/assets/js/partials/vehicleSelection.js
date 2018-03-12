class VehicleSelection {
    constructor( vehicleSelectionElement ) {
        this.vehicleSelectionElement = vehicleSelectionElement;

        this._resizeWatcher();
        this._vehicleSelectionCarousel();
        this._boxOpacity();

    }
    _resizeWatcher() {
        $( window ).on( 'resize orientationchange', function() {
            $( '.vehicle-selection--boxes' ).slick( 'resize' );
        });

    }

    _vehicleSelectionCarousel() {
        $( '.vehicle-selection--boxes' ).slick({
            mobileFirst: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: true,
            responsive: [
            {
                breakpoint: 768,
                settings: 'unslick'
            }
          ]
        });
    }
    _boxOpacity() {
        let vehicleRadio = $( '.radio__box' );
        let windowWidth = $( window ).width();
        vehicleRadio.change( function() {
            if ( windowWidth > 768 ) {
                $( this ).parent( '.radio' ).css( 'opacity', '1' );
                $( this ).parent( '.radio' ).removeClass( 'radio__bw' );
                $( '.radio__box:not(:checked)' ).parent( '.radio' ).css( 'opacity', '.3' );
                $( '.radio__box:not(:checked)' ).parent( '.radio' ).addClass( 'radio__bw' );

            }
        });
    }
}

module.exports = VehicleSelection;
