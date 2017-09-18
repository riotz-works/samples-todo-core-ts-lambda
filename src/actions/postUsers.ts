import * as _ from 'lodash';

import { AWSError, DynamoDB } from 'aws-sdk';
import { Request } from '../apiCore';
import { BasicAuthCreds } from '../entities/basicAuthCreds';
import { UserProfile } from '../entities/userProfile';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

type PutItemInput = DynamoDB.DocumentClient.PutItemInput;

const AWS_REGION = process.env.AWS_DEFAULT_REGION;
const BASIC_AUTH_CREDS_TABLE_NAME = 'Sample_TODO_BasicAuthCreds';
const USER_PROFILE_TABLE_NAME = 'Sample_TODO_UserProfile';

const dynamoDBClient = new DynamoDB.DocumentClient({ 'region' : AWS_REGION });

export const postUsers = async(request: Request<Model.SignupInfo>): Promise<Model.SignupResult> => {

    const basicAuthCredsEntity = new BasicAuthCreds();
    basicAuthCredsEntity.userId = request.body.basicAuthCreds.userId 
    basicAuthCredsEntity.password = request.body.basicAuthCreds.password

    const basicAuthCredsParams: PutItemInput = {
        'Item' : basicAuthCredsEntity,
        'TableName' : BASIC_AUTH_CREDS_TABLE_NAME
    };

    await dynamoDBClient.put(basicAuthCredsParams).promise()
        .catch((err: AWSError) => {
            throw new SimpleError(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
        });
    console.log('Put basicAuthCreds');

    const userProfileEntity = new UserProfile();
    userProfileEntity.userId = request.body.userId;

    const userProfileParam: PutItemInput = {
        'Item' : userProfileEntity,
        'TableName' : USER_PROFILE_TABLE_NAME
    };

    await dynamoDBClient.put(userProfileParam).promise()
        .catch((err: AWSError) => {
            throw new SimpleError(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
        });
    console.log('Put userProfile');
    
    return {
        'userId' : basicAuthCredsEntity.userId,
        'credentials' : {}
    };
}
