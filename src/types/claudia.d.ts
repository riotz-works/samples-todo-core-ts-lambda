declare namespace Claudia {

    type Handler = (req: Request<any>) => Result<any>;

    export interface ApiBuilder {
        ApiResponse: new (body: string, headers: { [name: string]: string }, httpCode: number) => ResponseEntity;
        new (options?: {}): ApiBuilder;
        get(path: string, request?: Handler): void;
        post(path: string, request?: Handler): void;
        put(path: string, request?: Handler): void;
        delete(path: string, request?: Handler): void;
    }

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

    export type Result<T> = Promise<T | ResponseEntity> | Promise<T> | T | ResponseEntity;

    export interface ResponseEntity {
        httpCode: number;
        headers: { [name: string]: string };
        body: string;
    }

}
