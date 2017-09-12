import { getTodosAction } from './actions/getTodos';
import { getUsersMeAction } from './actions/getUsersMe';
import { postTodosAction } from './actions/postTodos';
import { postTokenAction } from './actions/postToken';

import * as ApiBuilder from 'claudia-api-builder';
import { BaseError } from './errors/baseError';
import { ResponseUtil } from './utils/responseUtil';

const api: ApiBuilder = new ApiBuilder();

// Auth
api.post('/token', postTokenAction);

// Users
api.get('/users/me', async(request: ApiBuilder.Request<Model.Empty>) => await getUsersMeAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

// Todos
api.post('/todos', (request: ApiBuilder.Request<Model.Todos>) => postTodosAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

api.get('/todos', (request: ApiBuilder.Request<Model.Todos>) => getTodosAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

module.exports = api;
