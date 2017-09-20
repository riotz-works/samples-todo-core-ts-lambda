/* Copyright 2017 Riotz Works. */

/** Class representing UserProfile entity. */
export class UserProfile {

    public userId: string;
    public version: number;

    constructor(userId: string, version: number = 1) {
        this.userId = userId;
        this.version = version;
    }

}
