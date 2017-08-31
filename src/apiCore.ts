/**
 * Wrapper class for claudia-api-builder instance.
 */
export class ApiCore {

    /** Instance of claudia-apu-builder that is re-defined as API core in the application. */
    private static apiBuilder: Claudia.ApiBuilder;

    private constructor() {
    }

    /**
     * Getter for claudia-api-builder instance.
     */
    public static get api(): Claudia.ApiBuilder {
        if (this.apiBuilder === undefined) { // tslint:disable-line
            console.log('Instantiate API Core');
            const apiBuilder: Claudia.ApiBuilder = require('claudia-api-builder'); // tslint:disable-line
            this.apiBuilder = new apiBuilder();
        }

        return this.apiBuilder;
    }

}

export type Handler = Claudia.Handler;
export type Result<T> = Claudia.Result<T>;
export type Request<T> = Claudia.Request<T>;
export type ResponseEntity = Claudia.ResponseEntity;
