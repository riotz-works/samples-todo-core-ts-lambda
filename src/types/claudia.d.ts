declare module 'claudia-api-builder' {
    
        export = ApiBuilder;
    
        class ApiBuilder {
            ApiResponse: (body: {} | string, headers: { [name: string]: string }, httpCode: number) => ApiBuilder.ResponseEntity;
            new (options?: {}): ApiBuilder;
            get(path: string, request?: ApiBuilder.Handler): void;
            post(path: string, request?: ApiBuilder.Handler): void;
            put(path: string, request?: ApiBuilder.Handler): void;
            delete(path: string, request?: ApiBuilder.Handler): void;
        }
    
        namespace ApiBuilder {
            export type Handler = (req: Request<any>) => Result<any>;
            export type Result<T> = Promise<T | ResponseEntity> | Promise<T> | T | ResponseEntity;
            export interface Request<T> {
                queryString: { [name: string]: string };
                env: { [name: string]: string };
                headers: { [name: string]: string };
                normalizedHeaders: { [name: string]: string };
                post: { [name: string]: string };
                body: T;
                rawBody: string;
                pathParams: { [name: string]: string };
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
                headers: { [name: string]: string };
                body: string;
            }
        }
    }
    