/*
 * Copyright 2018 Riotz Works.
 */
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import HttpStatus from '../enums/http-status';
import ApiError, { ErrorBody } from '../errors/api-error';
import Logger from './logger';
import ResponseBuilder from './response-builder';

/**
 * Class for handling errors.
 */
export default class ErrorHandler {

    /**
     * Handle errors encountered during operation.
     *
     * If the thrown error type is defined in this app, it returns suitble error response by the given error.
     * Otherwise, it puts an ERROR log and returns 500 Internal Server Error with the error message.
     *
     * @param err {Error} Thrown error object
     */
    public static handle(req: ApiBuilder.AwsProxyRequest, err: Error): ApiBuilder.ResponseEntity {

        const logger = new Logger(this.name, req);

        if (!_.isNil((err as ApiError).body)) {
            logger.warn({ err }, `Thrown API Error: ${err.message}`);

            return new ResponseBuilder<ErrorBody>()
                .status((err as ApiError).statusCode)
                .body((err as ApiError).body)
                .build();
        }

        logger.error({ err }, `Unexpected error: ${err.message}`);

        return new ResponseBuilder<ErrorBody>()
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body({ message: err.message })
            .build();
    }
}
