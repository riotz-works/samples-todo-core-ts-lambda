/*
 * Copyright 2018 Riotz Works.
 */
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import SsmOperator from '../aws/ssm-operator';
import UsersDao from '../dao/users-dao';
import HttpStatus from '../enums/http-status';
import ApiError from '../errors/api-error';
import Logger from '../utils/logger';
import ResponseBuilder from '../utils/response-builder';

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

    const logger = new Logger(this.name, req);
    logger.info('Initiate action GET /users/me');

    const testParam = await new SsmOperator().withContext(req).getParameter('test_key');
    logger.info(`Get parameter from SSM: ${testParam}`);

    const user = await new UsersDao().withContext(req).find<UserProfile>('test01');
    if (_.isNil(user)) { // DynamoDB returns empty object '{}' if the user does not exist.
      throw new ApiError(HttpStatus.NOT_FOUND, { message: 'User not found.' });
    }

    logger.info(`Returning user profile: ${JSON.stringify(user)}`);
    logger.info('Complete action GET /users/me');

    return new ResponseBuilder<UserProfile>()
      .status(HttpStatus.OK)
      .body(user)
      .build();
  }

}
