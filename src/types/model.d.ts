declare namespace Model {

    export interface Empty {
        // Empty body '{ }'
    }

    export interface UserProfile {
        userId: string;
        username: string;
        version: number;
    }

    export interface Token {
        token: string; 
    }

    export interface Todo {
        userId: string;
        title: string;
        done: boolean;
    }

    export interface Todos {
        items: Todo[];
    }

}
