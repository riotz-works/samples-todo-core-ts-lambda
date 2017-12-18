declare module 'claudia-api-builder' {

    export = ApiBuilder;

    class ApiBuilder {

        constructor (options?: any);

        get   (path: string, request?: ApiBuilder.Handler | ApiBuilder.AwsProxyHandler): void;
        post  (path: string, request?: ApiBuilder.Handler | ApiBuilder.AwsProxyHandler): void;
        put   (path: string, request?: ApiBuilder.Handler | ApiBuilder.AwsProxyHandler): void;
        delete(path: string, request?: ApiBuilder.Handler | ApiBuilder.AwsProxyHandler): void;

        ApiResponse: new (body: {} | string, headers: { [name: string]: string }, httpCode: number) => ApiBuilder.ResponseEntity;
    }

    namespace ApiBuilder {

        export type Handler = (req: Request<any>) => Result<any>;
        export type AwsProxyHandler = (req: AwsProxyRequest) => Result<any>;
        export type Result<T> =  Promise<T> | T | Promise<ResponseEntity> | ResponseEntity;

        export interface AwsProxyRequest {
            body : string,
            resource: string,
            requestContext: {
                resourceId: string,
                apiId: string,
                resourcePath: string,
                httpMethod: string,
                requestId: string,
                accountId: string,
                identity: {
                    apiKey: string,
                    userArn: string,
                    cognitoAuthenticationType: string,
                    caller: string,
                    userAgent: string,
                    user: string,
                    cognitoIdentityPoolId: string,
                    cognitoIdentityId: string,
                    cognitoAuthenticationProvider: string,
                    sourceIp: string,
                    accountId:string 
                },
                stage: string
            },
            queryStringParameters: { 
                [name: string] : string 
            },
            headers: { 
                [name: string] : string 
            },
            pathParameters: { 
                [name: string] : string 
            },
            httpMethod: string,
            stageVariables: { 
                [name: string] : string 
            },
            path: string
        }

        export interface Request<T> {
            queryString: { 
                [name: string] : string
            };
            env: { 
                [name: string] : string
            };
            headers: { 
                [name: string] : string
            };
            normalizedHeaders: {
                [name: string]: string
            };
            post: {
                [name: string] : string
            };
            body: T;
            rawBody: string;
            pathParams: {
                [name: string] : string
            };
            lambdaContext: {};
            context: {
                method: string;
                path: string;
                stage: string;
                sourceIp: string;
                accountId: string;
                user: string;
                userAgent: string;
                userArn: string;
                caller: string;
                apiKey: string;
                authorizerPrincipalId: string;
                cognitoAuthenticationProvider: string;
                cofnitoAuthenticationType: string;
                cognitoIdentityId: string;
                cognitoIdentityPoolId: string;
            };
        }

        export interface ResponseEntity {
            httpCode: number;
            headers: {
                [name: string] : string
            };
            body: string;
        }
    }
}
    