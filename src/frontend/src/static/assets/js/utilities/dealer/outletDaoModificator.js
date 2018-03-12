class OutletDaoModificator {
    static modify( outletDAO ) {
        outletDAO.forEach( dealer => {
            this._modifyParts( dealer.outletprogram.parts );
            this._addDealerString( dealer );
        } );
    }

    static _modifyParts( parts ) {
        parts.forEach( ( part, index ) => {
            this._modifyPart( parts, part, index );
        } );
    }

    static _modifyPart( parts, part, index ) {
        switch ( part ) {
            case 'Taxi': {
                parts[ index ] = 'Taxi';
                break;
            }
            case 'Passenger_Car': {
                parts[ index ] = 'PKW';
                break;
            }
            case 'Truck': {
                parts[ index ] = 'LKW';
                break;
            }
            case 'Van': {
                parts[ index ] = 'Transporter';
                break;
            }
            default: {
                parts.splice( index, 1 );
                break;
            }
        }
    }

    static _addDealerString( dealer ) {
        dealer.dealerstring = JSON.stringify( dealer );
    }
}

module.exports = OutletDaoModificator;
