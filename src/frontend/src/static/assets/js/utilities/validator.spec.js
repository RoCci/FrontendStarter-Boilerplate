const chai = require( 'chai' );
const assert = chai.assert;

const Validator = require( './validator' );

describe( 'Validator', () => {
    describe( 'isNotEmpty', () => {
        it( 'should return false when an empty values will be passed', () => {
            assert.isFalse( Validator.isNotEmpty( '' ) );
        } );
        it( 'should return true when a non-empty values will be passed', () => {
            assert.isTrue( Validator.isNotEmpty( ' ' ) );
        } );
    } );
    describe( 'isPLZ', () => {
        it( 'should return false when an non-int value will be passed', () => {
            assert.isFalse( Validator.isPLZ( 'test' ) );
        } );
        it( 'should return true when an int value with 5 digits will be passed', () => {
            assert.isTrue( Validator.isPLZ( 12345 ) );
        } );
        it( 'should return false when an int value with less than 5 digits will be passed', () => {
            assert.isFalse( Validator.isPLZ( 1234 ) );
        } );
    } );
    describe( 'isEmail', () => {
        it( 'should return false when a dot is missing in the email', () => {
            assert.isFalse( Validator.isEmail( 'test@testde' ) );
        } );
        it( 'should return true when an email will be passed', () => {
            assert.isTrue( Validator.isEmail( 'test@test.de' ) );
        } );
        it( 'should return false when two @ signs will be passed', () => {
            assert.isFalse( Validator.isEmail( 'test@@test.de' ) );
        } );
    } );
} );
