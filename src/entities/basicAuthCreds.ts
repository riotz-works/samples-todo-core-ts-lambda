/* Copyright 2017 Riotz Works. */

const SPLITTER: string = ':';
const USER_ID_PART: number = 0;
const PASSWORD_PART: number = 1;

/** Class representing BasicAuthCreds entity. */
export class BasicAuthCreds {

    public userId: string;
    public password: string; 

    constructor(basicAuthCreds?: string) {
        if (basicAuthCreds) {
            const creds = basicAuthCreds.split(SPLITTER);
            this.userId = creds[USER_ID_PART];
            this.password = creds[PASSWORD_PART];
        }
    }

}
