declare namespace Model {

    export interface ActionBody {
        // for marking as action body
    }

    export interface Empty extends ActionBody {
        // Empty body '{ }'
    }

    export interface UserProfile extends ActionBody {
        userId: string;
        username: string;
        version: number;
    }

    export interface Token extends ActionBody { 
        token: string; 
    }

    export interface Todo extends ActionBody {
        userId: string;
        title: string;
        done: boolean;
    }

    export interface Todos extends ActionBody {
        items: Todo[];
    }

}
