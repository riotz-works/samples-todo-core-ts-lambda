/*
 * Copyright 2018 Riotz Works.
 */
import { AWSError, DynamoDB } from 'aws-sdk';
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import HttpStatus from '../enums/HttpStatus';
import ApiError from '../errors/ApiError';
import Logger from '../utils/Logger';
import ResponseBuilder from '../utils/ResponseBuilder';

const dynamoDBClient = new DynamoDB.DocumentClient({ region : 'us-west-2' });
const logger = Logger.getLogger('GetUsersMeAction');

/**
 * Response body type for GetUsersMeAction.
 */
export interface UserProfile {
    userId: string;
    username: string;
    version: number;
}

/**
 * Action class for **'GET /users/me'** .
 * It returns the authorized user's profile.
 */
export default class GetUsersMeAction {

    /**
     * Handles AWS proxy request and returns the result of **'GET /users/me'**.
     * 
     * @param req {ApiBuilder.AwsProxyRequest} AWS proxy request object
     */
    public static async handle(req: ApiBuilder.AwsProxyRequest): Promise<ApiBuilder.ResponseEntity> {
        logger.info({ req }, 'Initiate action GET /users/me');

        const params: DynamoDB.DocumentClient.GetItemInput = {
            Key: {
                userId : 'test02'
            },
            TableName : 'Samples_Todo_Users_development'
        };

        const user = await dynamoDBClient.get(params).promise()
            .then((res: DynamoDB.DocumentClient.GetItemOutput) => res.Item as UserProfile)
            .catch((err: AWSError | ApiError) => {
                logger.error({ req, err }, `DynamoDB Error: ${err.message}`);

                throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, {
                    message : 'Encountered DB error.'
                });
            });

        // DynamoDB returns empty object('{}') if the item does not exist with given params
        if (_.isNil(user)) {
            throw new ApiError(HttpStatus.NOT_FOUND, {
                message : 'User not found.'
            });
        }
        logger.debug({ req }, `Returning user profile: ${JSON.stringify(user)}`);
        logger.info({ req }, 'Complete action GET /users/me');

        return new ResponseBuilder<UserProfile>()
            .status(HttpStatus.OK)
            .body(user)
            .build();
    }

}
