import * as _ from 'lodash';

import { AWSError, DynamoDB } from 'aws-sdk';
import { Request } from '../apiCore';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

type GetItemInput = DynamoDB.DocumentClient.GetItemInput;
type AttributeMap = DynamoDB.DocumentClient.AttributeMap;
const dynamoDBClient = new DynamoDB.DocumentClient({ 'region' : 'us-east-1' });

export const getUsersMeAction = async(request: Request<Model.Empty>): Promise<Model.UserProfile> => {
    console.log(`Initiating Method: ${request.context.method} Path: ${request.context.path}`);

    const creds: string = request.headers.Authorization;
    if (!_.isEqual(creds, 'token')) {
        throw new SimpleError(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const params: GetItemInput = {
        'Key': {
            'userId' : 'test01'
        },
        'TableName' : 'Users_Devv'
    };

    return await dynamoDBClient.get(params).promise()
        .then((data: AttributeMap) => data.Item as Model.UserProfile)
        .catch((err: AWSError) => {
            throw new SimpleError(HttpStatus.SERVICE_UNAVAILABLE, err.message);
        });
};
