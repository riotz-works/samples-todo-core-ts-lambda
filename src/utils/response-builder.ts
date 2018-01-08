/*
 * Copyright 2018 Riotz Works.
 */
import * as ApiBuilder from 'claudia-api-builder';
import { api } from '../api';

/**
 * Class for building response object that is suitable for claudia api builder.
 */
export default class ResponseBuilder<T> {

    /** HTTP status code */
    private statusCode: number;

    /** Custom response headers */
    private headers: { [name: string]: string };

    /** Response body */
    private responseBody: T;

    constructor() {
        this.headers = {};
    }

    /**
     * Sets HTTP status code for the response.
     * 
     * @param statusCode { number } HTTP Status code
     */
    public status(statusCode: number): ResponseBuilder<T> {
        this.statusCode = statusCode;

        return this;
    }

    /**
     * Sets the CORS headers for the response.
     * 
     * @param origin { string } URI of the client's origin
     */
    public cors(origin: string = '*'): ResponseBuilder<T> {
        this.headers[ 'Access-Control-Allow-Origin' ] = origin;

        return this;
    }

    /**
     * Sets the body for the response.
     * 
     * @param body { object } Response body object
     */
    public body(body: T): ResponseBuilder<T> {
        this.responseBody = body;

        return this;
    }

    /**
     * Builds API response of claudia api builder.
     */
    public build(): ApiBuilder.ResponseEntity {

        return new api.ApiResponse(this.responseBody, this.headers, this.statusCode);
    }
}
