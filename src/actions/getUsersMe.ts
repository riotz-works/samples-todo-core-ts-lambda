import * as _ from 'lodash';

import { AWSError, DynamoDB } from 'aws-sdk';
import { Request } from 'claudia-api-builder';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

type GetItemInput = DynamoDB.DocumentClient.GetItemInput;
// X type AttributeMap = DynamoDB.DocumentClient.AttributeMap;
const dynamoDBClient = new DynamoDB.DocumentClient({ 'region' : 'us-west-2' });

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
        'TableName' : 'Users_developmentt'
    };

    const res: DynamoDB.DocumentClient.GetItemOutput = await dynamoDBClient.get(params).promise()
        .catch((err: AWSError) => {
            console.log(JSON.stringify(err));
            throw err;
        });

    if (!res || !res.Item) {
        throw new Error('xxxxxx');
    }

    const userProfile: Model.UserProfile = {
        'userId': res.Item.userId,
        'username': res.Item.username,
        'version': res.Item.version
    };

    return userProfile;
};
