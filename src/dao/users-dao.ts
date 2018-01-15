/*
 * Copyright 2018 Riotz Works.
 */
import { AWSError, DynamoDB } from 'aws-sdk';
import * as ApiBuilder from 'claudia-api-builder';
import HttpStatus from '../enums/http-status';
import ApiError from '../errors/api-error';
import Logger from '../utils/logger';

const dynamoDBClient = new DynamoDB.DocumentClient({ region: process.env.AWS_DEFAULT_REGION });
const table = 'Samples_Todo_Users_development';

/**
 * Database access object for User resources.
 */
export default class UsersDao {

  /** Logger */
  private logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Set the given request context to logger.
   *
   * logger will append the request context to each log items, with a key of 'req'.
   * This will help you to trace the process sequence of a certain API call.
   *
   * @param awsProxyRequest AWS Proxy Request from API Gateway
   */
  public withContext(awsProxyRequest: ApiBuilder.AwsProxyRequest): UsersDao {
    this.logger.withRequestContext(awsProxyRequest);

    return this;
  }

  /**
   * Find an item from DynamoDB.
   *
   * @param partitionKey Partition key
   */
  public async find<T>(partitionKey: string): Promise<T> {
    this.logger.info(`Get a record with partition key: ${partitionKey} from ${table}`);

    const params = {
      Key: {
        userId: partitionKey
      },
      TableName: table
    };

    return await dynamoDBClient.get(params).promise()
      .then((res: DynamoDB.DocumentClient.GetItemOutput) => res.Item as T)
      .catch((err: AWSError) => {
        this.logger.error({ err }, `DynamoDB Error: ${err.message}`);
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Encountered DB error.' });
      });
  }
}
