import { BaseError } from './baseError';

/**
 * Simple error class.
 */
export class SimpleError extends BaseError {

        /**
         * Constructs simple error.
         *
         * @param {number} statusCode HTTP status code
         * @param {string} message    Error message
         */
        constructor(statusCode: number, message: string) {
            super(statusCode, message);

            Error.captureStackTrace(this, this.constructor);
        }
    }
