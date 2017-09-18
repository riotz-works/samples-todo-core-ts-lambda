declare namespace Model {

    export interface Empty {
        // For typing empty body '{ }'
    }

    export interface BasicAuthCreds {
        userId: string;
        password: string;
    }

    export interface AuthToken {
        token_type: string;
        id_token: string;
        expires_in: number;
        user_id: string;
    }

    export interface SignupInfo {
        basicAuthCreds: BasicAuthCreds;
        userId: string;
    }

    export interface SignupResult {
        userId: string;
        credentials: AuthToken;
    }

    export interface Todo {
        userId: string;
        title: string;
        done: boolean;
    }

    export interface Todos {
        items: Todo[];
    }

    export interface Token {
        token: string; 
    }

    export interface UserProfile {
        userId: string;
        version: number;
    }

}
