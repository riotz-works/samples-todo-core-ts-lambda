/*
 * Copyright 2018 Riotz Works.
 */

/**
 * Error response body for the appliction.
 */
export interface ErrorBody {
    message: string;
    error_data?: {};
}

/**
 * Class for checked error for the application.
 */
export default class ApiError extends Error {

    /** HTTP status code */
    public statusCode: number;

    /** Error response body */
    public body: ErrorBody;

    /** Error cause object for logging unknown error */
    public cause?: Error;

    constructor(statusCode: number, body: ErrorBody, cause?: Error) {
        super(body.message);

        this.statusCode = statusCode;
        this.body = body;
        this.cause = cause;

        Error.captureStackTrace(this, this.constructor);
    }
}
