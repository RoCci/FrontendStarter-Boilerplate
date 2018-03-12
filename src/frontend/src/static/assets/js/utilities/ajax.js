class AJAX {
    static _init( resolve, reject ) {
        this.xhttp = new XMLHttpRequest();
        this.xhttp.withCredentials = true;

        if ( this._supportsJson() ) {
            this._initHandler( resolve, reject );
        }
        else {
            this._initLegacyHandler( resolve, reject );
        }
    }

    static _supportsJson() {
        try {
            // some browsers throw when setting `responseType` to an unsupported value
            this.xhttp.responseType = 'json';
            return true;
        }
        catch ( error ) {
            return false;
        }
    }

    static _initHandler( resolve, reject ) {
        this.xhttp.onreadystatechange = () => {
            if ( this.xhttp.readyState === XMLHttpRequest.DONE ) {
                if ( this.xhttp.status === 200 ) {
                    resolve( this.xhttp.response );
                }
                else {
                    reject( {
                        status: this.xhttp.status,
                        statusText: this.xhttp.statusText
                    } );
                }
            }
        };
    }

    static _initLegacyHandler( resolve, reject ) {
        this.xhttp.onload = () => {
            if ( this.xhttp.status === 200 ) {
                resolve( JSON.parse( this.xhttp.responseText ) );
            }
            else {
                reject( {
                    status: this.xhttp.status,
                    statusText: this.xhttp.statusText
                } );
            }
        };
    }

    static get ( url ) {
        return new Promise( ( resolve, reject ) => {
            this._init( resolve, reject );

            this.xhttp.open( 'GET', url );
            this.xhttp.send();
        } );
    }

    static post( json ) {
        return new Promise( ( resolve, reject ) => {
            this._init( resolve, reject );

            this.xhttp.open( 'POST', json.url );
            this.xhttp.setRequestHeader( 'Content-type', 'application/json' );
            this.xhttp.send( JSON.stringify( json.data ) );
        } );
    }
}

module.exports = AJAX;
