/*
 * Copyright 2018 Riotz Works.
 */
import * as AWS from 'aws-sdk';
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import HttpStatus from '../enums/http-status';
import ApiError from '../errors/api-error';
import Logger from '../utils/logger';

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
const ssm: AWS.SSM = new AWS.SSM();

/**
 * Class for AWS Simple System Manager operations.
 */
export default class SsmOperator {

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
  public withContext(awsProxyRequest: ApiBuilder.AwsProxyRequest): SsmOperator {
    this.logger.withRequestContext(awsProxyRequest);

    return this;
  }

  /**
   *
   * Gets the parameter from the AWS parameter store.
   *
   * @return {string} Parameter value corresponding the key
   */
  public async getParameter(key: string): Promise<string> {

    return await ssm.getParameter({ Name: key })
      .promise()
      .then((res: AWS.SSM.GetParameterResult) => res.Parameter)
      .then((param?: AWS.SSM.Parameter) => {

        if (_.isNil(param) || _.isNil(param.Value)) {
          throw new ApiError(
            HttpStatus.INTERNAL_SERVER_ERROR, { message: `SSM Parameter not found with key: ${key}` });
        }

        return param.Value;
      })
      .catch((err: AWS.AWSError) => {
        this.logger.error({ err }, 'SSM Error thrown by AWS');

        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, {
          message: 'Failed to get parameter from SSM.'
        });
      });
  }
}
