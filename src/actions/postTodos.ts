import * as _ from 'lodash';

import { AWSError, DynamoDB } from 'aws-sdk';
import { Request } from '../apiCore';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

type PutItemInput = DynamoDB.DocumentClient.PutItemInput;
type AttributeMap = DynamoDB.DocumentClient.AttributeMap;
const dynamoDBClient = new DynamoDB.DocumentClient({ 'region' : 'us-east-1' });

export const postTodosAction = async(request: Request<Model.Todos>): Promise<Model.Todos> => {
    console.log(`Initiating Method: ${request.context.method} Path: ${request.context.path}`);

    const creds: string = request.headers.Authorization;
    if (!_.isEqual(creds, 'token')) {
        throw new SimpleError(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const params: PutItemInput = {
        'Item': {
            'items': request.body.items,
            'userId' : 'test01'
        },
        'TableName' : 'Todos_Dev'
    };

    return await dynamoDBClient.put(params).promise()
        .then((data: AttributeMap) => data.Item as Model.Todos)
        .catch((err: AWSError) => {
            throw new SimpleError(HttpStatus.SERVICE_UNAVAILABLE, err.message);
        });
};
