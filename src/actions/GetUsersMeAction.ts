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
const logger = Logger.getLogger('GetUsersMeAction', 'debug');

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
        logger.debug({ req }, 'Initiate action for GET /users/me');

        const params: DynamoDB.DocumentClient.GetItemInput = {
            Key: {
                userId : 'test01'
            },
            TableName : 'Samples_Todo_Users_development'
        };

        const user = await dynamoDBClient
            .get(params)
            .promise()
            .then((res: DynamoDB.DocumentClient.GetItemOutput) => {

                // DynamoDB returns null if the item does not exist with the given params
                if (_.isNil(res.Item)) {
                    throw new ApiError(HttpStatus.NOT_FOUND, { message : 'User not found.' });
                }

                return res.Item as UserProfile;
            })
            .catch((err: AWSError) => {
                logger.error({ req, err }, `DynamoDB Error: ${err.message}`);
                throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, { message : 'Encountered DB error.' });
            });

        return new ResponseBuilder<UserProfile>()
            .status(HttpStatus.OK)
            .body(user)
            .build();
    }

}
