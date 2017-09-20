import * as _ from 'lodash';

import { Request } from '../apiCore';
import { BasicAuthCreds } from '../entities/basicAuthCreds';
import { DynamoDBTemplate } from '../repositories/dynamoDBTemplate';
import { UserProfile } from '../entities/userProfile';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

const BASIC_AUTH_CREDS_TABLE_NAME = 'Sample_TODO_BasicAuthCreds';
const USER_PROFILE_TABLE_NAME = 'Sample_TODO_UserProfile';

const basicAuthCredsRepo = new DynamoDBTemplate<BasicAuthCreds>(BASIC_AUTH_CREDS_TABLE_NAME);
const userProfileRepo = new DynamoDBTemplate<UserProfile>(USER_PROFILE_TABLE_NAME);

export const postUsers = async(request: Request<Model.SignupInfo>): Promise<Model.SignupResult> => {

    const basicAuthCreds = new BasicAuthCreds(request.body.basicAuthCreds);
    await basicAuthCredsRepo.put(basicAuthCreds);

    const userProfile = new UserProfile(request.body.userId);

    // const basicAuthCredsEntity = new BasicAuthCreds();
    // basicAuthCredsEntity.userId = request.body.basicAuthCreds.userId;
    // basicAuthCredsEntity.password = request.body.basicAuthCreds.password;
    // await putBasicAuthCreds(basicAuthCredsEntity);

    // const userProfileEntity = new UserProfile();
    // userProfileEntity.userId = request.body.userId;
    // await putUserProfile(userProfileEntity);
    
    return {
        'userId' : basicAuthCredsEntity.userId,
        'credentials' : {}
    };
}


// export class PostUsers {

//     public async handle(request: Request<Model.SignupInfo>): Promise<Model.SignupResult> {

//         console.log('Attempt to put basicAuthCreds');
//         const basicAuthCredsMapper = new DynamoDBMapper(BASIC_AUTH_CREDS_TABLE_NAME);
//         const basicAuthCredsEntity = new BasicAuthCreds();
//         basicAuthCredsEntity.userId = request.body.basicAuthCreds.userId;
//         basicAuthCredsEntity.password = request.body.basicAuthCreds.password; 
//         await basicAuthCredsMapper.put(basicAuthCredsEntity);

//         const userProfileMapper = new DynamoDBMapper(USER_PROFILE_TABLE_NAME);
//         const userProfileEntity = new UserProfileEntity();
//         userProfileEntity.userId = basicAuthCredsEntity.userId;
//         await userProfileMapper.put(userProfileEntity);

//         return null;

//     }

// }

// const putBasicAuthCreds = async(basicAuthCredsEntity: BasicAuthCreds): Promise<PutItemOutput> => {

//     const putItemParams: PutItemInput = {
//         'Item' : basicAuthCredsEntity,
//         'TableName' : BASIC_AUTH_CREDS_TABLE_NAME
//     };
//     console.log('Attempt to put basicAuthCreds');

//     return await dynamoDBClient.put(putItemParams).promise()
//         .catch((err: AWSError) => {
//             throw new SimpleError(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
//         });
// };

// const putUserProfile = async(userProfileEntity: UserProfile): Promise<PutItemOutput> => {

//     const putItemParams: PutItemInput = {
//         'Item' : userProfileEntity,
//         'TableName' : USER_PROFILE_TABLE_NAME
//     };
//     console.log('Attempt to put userProfile');

//     return await dynamoDBClient.put(putItemParams).promise()
//         .catch((err: AWSError) => {
//             throw new SimpleError(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
//         });
// }



