import * as _ from 'lodash';

import { Request, Result } from 'claudia-api-builder';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';
import { ResponseUtil } from '../utils/responseUtil';

export const postTokenAction = (request: Request<Model.Empty>): Result<Model.Token> => {

    console.log(`Initiating Method: ${request.context.method} Path: ${request.context.path}`);

    const creds = request.headers.Authorization.split(':');
    const userId = creds[0];
    const passwd = creds[1];

    try {
        if (!_.isEqual(userId, 'test01')) {
            throw new SimpleError(HttpStatus.UNAUTHORIZED, 'Invalid user ID');
        }

        if (!_.isEqual(passwd, 'password')) {
            throw new SimpleError(HttpStatus.UNAUTHORIZED, 'Invalid password');
        }
    } catch (e) {
        const err: SimpleError = e as SimpleError;

        return ResponseUtil.errorResponse(err.statusCode, err.message);
    }


    return { 'token' : 'token' };
};
