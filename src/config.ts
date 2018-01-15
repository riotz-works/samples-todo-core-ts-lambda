/*
 * Copyright 2018 Riotz Works.
 */
import * as _ from 'lodash';

const getEnv = (env: string | undefined, defValue: string): string => _.defaultTo(env, defValue);

const LOG_LEVEL = getEnv(process.env.LOG_LEVEL, 'info');

export default {
    LOG_LEVEL
};
