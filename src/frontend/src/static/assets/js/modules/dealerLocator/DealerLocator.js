import _ from 'lodash';

import toLetter from './dealerLocatorHelpers.js';
import dummyJson from '../googleapis/dealer-search-dummy-berlin.json';
//import googleapiMarker from '../googleapis/richmarker-compiled.js';

import sidebarEntryTpl from './templates/sidebar-entry.handlebars';
import infoboxTpl from './templates/infobox.handlebars';
import markerTpl from './templates/marker.handlebars';
/*const errorTpl = require( './templates/error.handlebars' ); */

class DealerLocator {

    constructor() {
        this.init();
    }

    init() {
        $.fn.dealerLocator = function() {
            this.mapCanvas = document.getElementById( 'map-canvas' );
            this.$mapCanvas = $( this.mapCanvas );
            this.$sidebar = $( this ).find( '[hook=sidebar]' );
            this.$sidebarHeader = $( this ).find( '[hook=sidebar-header]' );
            this.$sidebarInner = $( this ).find( '[hook=sidebar-inner]' );
            this.$sidebarContainer = this.$sidebar.find( '[hook=sidebar-container]' );
            this.$searchbar = $( this ).find( '[hook=searchbar]' );
            this.searchbarForm = document.getElementById( 'searchbar-form' );
            this.$searchbarInput = $( this ).find( '[hook=searchbar-input]' );
            this.$searchbarSubmit = $( this ).find( '[hook=searchbar-submit]' );
            this.$form = $( this ).find( '[hook=form]' );
            this.$formOutletcode = $( this ).find( '[hook=form-outletcode]' );
            this.$sidebarTongue = $( this ).find( '[hook=sidebar-tongue]' );

            this.config = {
                gmKey: $( this ).attr( 'data-gmKey' )
            };

            const methods = {
                _init: () => {

                    this.$searchbarInput.attr( 'value', $( this ).attr( 'data-searchbar-input' ) );
                    //this.$searchbarSubmit.on('click', methods._loadRealData);

                    $( this.searchbarForm ).on( 'submit', function() {
                        $.post( $( this ).attr( 'action' ), $( this ).serialize(), function( json ) {
                            methods._initMap( json );
                        }, 'json' );
                        return false;
                    });

                    $(function() {
                        let requiredCheckboxes = $( '.form-contact-variante :checkbox[required]' );
                        requiredCheckboxes.change(function() {
                            if ( requiredCheckboxes.is( ':checked' ) ) {
                                requiredCheckboxes.removeAttr( 'required' );
                            }
                            else {
                                requiredCheckboxes.attr( 'required', 'required' );
                            }
                        });
                    });

                    //click handler to write data into form and submit
                    const _form = $( this ).find( '[hook=form]' );
                    $( this ).on( 'click', '[hook=dealer-locator-button]', function() {
                        let partner = $( this )[ 0 ].parentNode.parentNode;

                        if ( document.getElementById( 'pick-partner' ) ) {
                            document.getElementById( 'pick-partner' ).innerHTML = '<h3>Ihr gewählter Partner:</h3>';
                            $( '#pick-partner' ).append( '<p class="partner-name">' + partner.childNodes[ 3 ].innerHTML + '<br />' + partner.childNodes[ 7 ].innerHTML + '</p' );
                            $( '#outletCode' ).val( partner.childNodes[ 9 ].childNodes[ 0 ].getAttribute( 'data-outletcode' ) );
                        }
                    });
                    $( window ).on( 'resize', _.debounce( methods._onResize, 300 ) );
                    methods._onResize();

                    this.$sidebarTongue.on( 'click', methods._sidebarTongueClick );

                    $( this ).addClass( 'in' );

                    methods._loadMapAPI();
                },
                // load the map api's at runtime
                _loadMapAPI: () => {
                    const scriptsToLoad = [
                        '//maps.googleapis.com/maps/api/js?key=' + this.config.gmKey,
                        '/assets/js/modules/googleapis/richmarker-compiled.js',
                        '/assets/js/modules/googleapis/infobox_packed.js'
                    ];
                    const loadScript = () => {
                        const _scripts = document.getElementsByTagName( 'script' );
                        const _firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ];
                        const _url = scriptsToLoad.shift();
                        let _tag = document.createElement( 'script' );
                        _tag.onload = () => {
                            scriptsToLoad.length ? loadScript() : methods._loadMapAPIcomplete() ;
                        };
                        _scripts[ 0 ].parentNode.insertBefore( _tag, _firstScriptTag );
                        _tag.src = _url;
                    };
                    const _scriptURL = scriptsToLoad[ 0 ];
                    const _scripts = document.getElementsByTagName( 'script' );
                    for ( var i = _scripts.length; i--; ) {
                        if ( _scripts[ i ].src === _scriptURL ) {
                            return false;
                        }
                    }
                    loadScript();
                },
                _loadMapAPIcomplete: () => {
                    methods._loadStaticDummyData();
                    //methods._loadStaticError();
                    //methods._loadRealData();
                },
                _loadStaticDummyData: () => {
                    methods._initMap( dummyJson );
                    //$.get( dummyJson, methods._initMap);
                },
                /*
                _loadStaticError: () => {
                        $.get('./acma-assets/js/vendor/googleapis/dealer-search-error.json', methods._initMap);
                },*/
                /*_loadRealData: () => {
                        $.getJSON(
                                '/RQAH/search?postal_code_or_cityname='+encodeURIComponent($('[hook=searchbar-input]').val()),
                                function (data) {
                                        methods._initMap(data);
                                        console.log(data);
                                }
                        );
                    },*/
                // INTI MAP
                _initMap: (data) => {

                    methods._clearMap();

                    const mapOptions = {
                        zoom: 11,
                        minZoom: 8,
                        maxZoom: 16,
                        disableDefaultUI: true,
                        center: new google.maps.LatLng( 53.1, 13.1 ),
                        draggable: true,
                        scrollwheel: true
                    };

                    this.map = new google.maps.Map( this.mapCanvas, mapOptions );

                    if ( !methods._isMobile() ) {
                        this.map.panBy( -250, 0 );
                    }
                    if ( data ) {
                        var retailersarr = data;
                        $.each( retailersarr, (i) => {
                            methods._createMarker( retailersarr[ i ], i );
                            methods._createSidebarEntry( retailersarr[ i ], i );
                        });
                    }
                    else if ( data.error ) {
                        methods._initError( data.error );
                    }
                },
                _initError: (errorText) => {
                    const error = $( errorTpl({
                        errorText:errorText
                    }) );
                    this.$sidebarContainer.append( error );
                },
                // CLEAR MAP
                _clearMap: () => {
                    // delete all markers and info boxes
                    $.each( this.markers, (i) => {
                        this.markers[ i ].setMap( null );
                    });
                    $.each( this.infoBoxes, (i) => {
                        this.infoBoxes[ i ].close();
                    });
                    this.$sidebarContainer.empty();
                    this.markers = [];
                    this.infoBoxes = [];
                    // init latnlgbounds
                    this.latlngbounds = new window.google.maps.LatLngBounds;
                },
                // SIDEBAR ENTRIES
                _createSidebarEntry: (retailer, idx) => {
                    let sidebarEntry = $( sidebarEntryTpl({
                        address: retailer.outletaddress.outletstreet1,
                        city: retailer.outletaddress.outletzipcode + ' ' + retailer.outletaddress.outletcity,
                        distance: retailer.distance + ' km',
                        id: (idx + 1),
                        letter: toLetter( idx + 1 ),
                        name: retailer.outletname1 + ', ' + retailer.outletname2 + ', ' + retailer.outletname3,
                        outletcode: retailer.outletcode
                    }) );
                    this.$sidebarContainer.append( sidebarEntry );
                    sidebarEntry.on( 'click', function() {
                        const _id = $( this ).attr( 'data-id' );
                        methods._sidebarSetActive( _id );
                        $( '[hook=dealer-locator-marker][data-id=' + _id + ']' ).trigger( 'click' );
                    });
                },
                _sidebarSetActive: (id) => {
                    const _container = this.$sidebarContainer;
                    $( '[hook=sidebar-entry]' ).each(function() {
                        if ( id === $( this ).attr( 'data-id' ) ) {
                            if ( $( this ).hasClass( 'selected' ) ) {
                                $( this ).removeClass( 'selected' );
                            }
                            else {
                                $( this ).addClass( 'selected' );
                                let _scrollAnimate;
                                if ( $( this ).position().top < 0 ||
                                    $( this ).position().top + $( this ).height() > _container.height() ) {
                                    _container.animate({
                                        scrollTop: _container.scrollTop() + $( this ).position().top
                                    }, 600 );
                                }
                            }
                        }
                        else {
                            $( this ).removeClass( 'selected' );
                        }
                    });
                },
                _sidebarTongueClick: () => {
                    if ( this.$sidebar.hasClass( 'closed' ) ) {
                        this.$sidebar.removeClass( 'closed' );
                        this.$sidebar.removeAttr( 'style' );
                    }
                    else {
                        this.$sidebar.addClass( 'closed' );
                        this.$sidebar.css({
                            top: this.$mapCanvas.height() - 45
                        });
                    }
                },
                // MARKERS
                _createMarker: (retailer, idx) => {

                    let markerContent = markerTpl({
                        dataOtc: 'haendlersuche:haendler' + (idx + 1) + '_lightbox#internal',
                        dataId: idx + 1,
                        letter: toLetter( idx + 1 ).toLowerCase()
                    });
                    let position = new google.maps.LatLng( parseFloat( retailer[ 'outletgeographicinformation' ][ 'latitude' ] ), parseFloat( retailer[ 'outletgeographicinformation' ][ 'longitude' ] ) );
                    this.latlngbounds.extend( position );

                    const RichMarkerPosition = window[ 'RichMarkerPosition' ];

                    let marker = new RichMarker({
                        map: this.map,
                        position: position,
                        draggable: false,
                        flat: true,
                        anchor: 8,
                        content: markerContent
                    });

                    methods._createInfoBox( marker, retailer, idx );
                    this.map.fitBounds( this.latlngbounds );
                    this.markers.push( marker );

                    google.maps.event.addDomListener( marker, 'click', function( e ) {
                        $( this.content ).addClass( 'active' );
                        methods._sidebarSetActive( $( this.content ).attr( 'data-id' ) );
                    });
                },
                // INFO BOX
                _createInfoBox: (marker, retailer, idx) => {

                    const infoboxHTML = infoboxTpl({
                        name: retailer.outletname1 + ', ' + retailer.outletname2 + ', ' + retailer.outletname3,
                        address: retailer.outletaddress.outletstreet1,
                        city: retailer.outletaddress.outletzipcode + ' ' + retailer.outletaddress.outletcity,
                        outletcode: retailer.outletcode
                    });
                    let infoBoxOptions = {
                        boxClass: 'dealer-locator__infobox',
                        content: infoboxHTML,
                        disableAutoPan: false,
                        maxWidth: 0,
                        pixelOffset: new google.maps.Size( -40, 30 ),
                        zIndex: null,
                        closeBoxMargin: '0 0 0 0',
                        closeBoxURL: $( 'html' ).attr( 'assets/img/googlemaps/maps_close.svg' ),
                        infoBoxClearance: new google.maps.Size( 10, 10 ),
                        isHidden: false,
                        pane: 'floatPane',
                        enableEventPropagation: true
                    };

                    var infoBox = new InfoBox( infoBoxOptions );

                    google.maps.event.addListener( marker, 'click', () => {
                        $.each( this.infoBoxes, (i) => {
                            this.infoBoxes[ i ].close();
                        });

                        infoBox.open( this.map, marker );

                        $( '.retailerMarker' ).removeClass( 'active' );

                        $( marker.markerContent_ ).find( '.retailerMarker' ).addClass( 'active' );

                    });

                    google.maps.event.addListener( infoBox, 'closeclick', function() {
                        $( '.retailerMarker' ).removeClass( 'active' );
                        $( '[hook=sidebar-entry]' ).removeClass( 'selected' );
                    });

                    this.infoBoxes.push( infoBox );

                },

                _applyDataToForm: () => {

                },
                _onResize: () => {
                    methods._isMiniVersion();
                    const _maxHeightMax = 770;
                    let _maxHeight = this.$mapCanvas.height() - parseInt( this.$sidebar.css( 'padding-top' ) ) - this.$sidebarTongue.height();
                    if ( _maxHeight > _maxHeightMax ) {
                        _maxHeight = _maxHeightMax;
                    }
                    this.$sidebarInner.css({
                        'max-height': _maxHeight
                    });
                },
                _isMobile: () => {
                    return matchMedia( '(max-width: 767px)' ).matches;
                },
                _isMiniVersion: () => {
                    const _isMini = matchMedia( '(max-width: 1023px)' ).matches;
                    _isMini ? $( this ).addClass( 'dealer-locator--mini' ) : $( this ).removeClass( 'dealer-locator--mini' );
                    return _isMini;
                }

            };

            methods._init();

        };

        $( '[hook=dealer-locator]' ).each(function() {
            $( this ).dealerLocator();
        });

    }
}

module.exports = DealerLocator;
