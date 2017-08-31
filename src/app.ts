import { getTodosAction } from './actions/getTodos';
import { getUsersMeAction } from './actions/getUsersMe';
import { postTodosAction } from './actions/postTodos';
import { postTokenAction } from './actions/postToken';

import { ApiCore, Request } from './apiCore';
import { BaseError } from './errors/baseError';
import { ResponseUtil } from './utils/responseUtil';

// Auth
ApiCore.api.post('/token', postTokenAction);

// Users
ApiCore.api.get('/users/me', async(request: Request<Model.Empty>) => getUsersMeAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

// Todos
ApiCore.api.post('/todos', async(request: Request<Model.Todos>) => postTodosAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

ApiCore.api.get('/todos', async(request: Request<Model.Todos>) => getTodosAction(request)
    .catch((err: BaseError) => ResponseUtil.errorResponse(err.statusCode, err.message)));

module.exports = ApiCore.api;
