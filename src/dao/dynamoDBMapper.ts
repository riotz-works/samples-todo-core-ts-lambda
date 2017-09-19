import { AWSError, DynamoDB } from 'aws-sdk';
import { HttpStatus } from '../enums/httpStatus';
import { SimpleError } from '../errors/simpleError';

type GetItemInput = DynamoDB.DocumentClient.GetItemInput;
type AttributeMap = DynamoDB.DocumentClient.AttributeMap;

const AWS_REGION = process.env.AWS_DEFAULT_REGION;

const dynamoDBClient = new DynamoDB.DocumentClient({ 'region' : AWS_REGION });

export class DynamoDBMapper<T> {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async load(key: {}): Promise<T> {

        const params: GetItemInput = {
            'Key' : key,
            'TableName' : this.tableName 
        }

        return await dynamoDBClient.get(params)
            .promise()
            .then((data: AttributeMap) => data.Item as T)
            .catch((err: AWSError) => {
                throw new SimpleError(HttpStatus.SERVICE_UNAVAILABLE, err.message);
            });

    }

    public async put(entity: T): Promise<Model.Empty> {

        const params: DynamoDB.DocumentClient.PutItemInput = {
            'Item' : entity,
            'TableName' : this.tableName
        };

        return await dynamoDBClient.put(params)
            .promise()
            .catch((err: AWSError) => {
                throw new SimpleError(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
            });
    }
}
