const AJAX = require( './ajax.js' );

const config = {
    // serverDomain: 'http://stage-web-lp-trapo-mbvd-de.pixelpark.net:8082'
    serverDomain: 'http://mbvd-lpp.local:8080'

};

class RestClient {
    constructor() {
        this.baseUrl = `${config.serverDomain}/lpp`;


        // only use this for temporary testing the connection the backend service
        (async () => {
            try {
                const healthstatus = await this._getHealthstatus();
                console.log( healthstatus );

                const version = await this._getVersion();
                console.log( version );
            }
            catch ( error ) {
                console.error( error );
            }
        })();
    }

    async validateAuthenticationNumber( data ) {
        try {
            const response = await AJAX.post( {
                url: `${this.baseUrl}/hermes/checkAuthenticationNumber`,
                data: data
            } );

            return this._getResponsePromise( response );
        }
        catch ( error ) {
            console.error( error );
        }
    }

    async subscribeUser( data ) {
        try {
            const response = await AJAX.post( {
                url: `${this.baseUrl}/subscribe`,
                data: data
            } );

            return this._getResponsePromise( response );
        }
        catch ( error ) {
            console.error( error );
        }
    }

    async _getVersion() {
        try {
            return AJAX.get( `${this.baseUrl}/getVersion` );
        }
        catch ( error ) {
            console.error( error );
        }
    }

    async _getHealthstatus() {
        try {
            return AJAX.get( `${this.baseUrl}/healthStatus` );
        }
        catch ( error ) {
            console.error( error );
        }
    }

    _getResponsePromise( response ) {
        return new Promise( ( resolve, reject ) => {
            if ( response.validationErrors ) {
                reject( response.validationMessages );
            }
            else {
                resolve( response.validationBody );
            }
        } );
    }
}

module.exports = RestClient;
