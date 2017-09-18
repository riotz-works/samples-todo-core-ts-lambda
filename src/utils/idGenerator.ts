/* Copyright 2017 Riotz Works. */

/** Class for generating ID */
export class IdGenerator {

    /**
     * Generate unique ID using timestamp.
     * 
     * @return Unique ID
     */
    public static generateUniqueId(): string {
        return new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);
    }

}
