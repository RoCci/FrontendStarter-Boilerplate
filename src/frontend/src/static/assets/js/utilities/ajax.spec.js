const chai = require( 'chai' );
const sinon = require( 'sinon' );

const AJAX = require( './ajax.js' );

chai.should();

describe( 'AJAX', function() {
    let xhr;
    let requests;

    beforeEach( function() {
        xhr = sinon.useFakeXMLHttpRequest();
        global.XMLHttpRequest = xhr;

        requests = [];
        xhr.onCreate = xhr => {
            requests.push( xhr );
        };
    } );

    afterEach( function() {
        xhr.restore();
    } );

    it( 'should send given data as JSON body', function() {
        const json = { url: 'http://jsonplaceholder.typicode.com/posts', data: 'hello world' };
        const dataJson = JSON.stringify( json.data );

        AJAX.post( json );

        requests[ 0 ].requestBody.should.equal( dataJson );
    } );
} );
