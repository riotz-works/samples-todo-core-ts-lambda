/*
 * Copyright 2018 Riotz Works.
 */
import * as ApiBuilder from 'claudia-api-builder';
import GetUsersMeAction from './actions/get-users-me';
import ErrorHandler from './utils/error-handler';

export const api = new ApiBuilder({ requestFormat: 'AWS_PROXY' });

api.get('/users/me',
  async (req: ApiBuilder.AwsProxyRequest): Promise<ApiBuilder.ResponseEntity> =>
    await GetUsersMeAction.handle(req).catch((err: Error) => ErrorHandler.handle(req, err)));

module.exports = api;
