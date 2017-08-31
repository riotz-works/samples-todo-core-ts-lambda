/**
 * Base error class.
 */
export class BaseError extends Error {

    /** Error message */
    public message: string;

    /** HTTP status code */
    public statusCode: number;

    /**
     * Constructs base error.
     *
     * @param {number} statusCode HTTP status code
     * @param {string} message    Error message
     */
    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}
