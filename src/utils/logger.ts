/*
 * Copyright 2018 Riotz Works.
 */
 /* tslint:disable: no-any */
import * as bunyan from 'bunyan';
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import Config from '../config';

/**
 * Class for providing a suitable logger for each environment.
 */
export default class Logger {

    /**
     * Provides suitable bunyan logger object for each environment.  
     * You can configure the log level by setting the value via environment variables.
     * There are 2 available logging levels below.
     *   - info (default)
     *   - debug
     * 
     * It is recommended that you create the logger object for each of your actions class modules
     * to keep the logging context consistently.
     * 
     * @param loggerName Logger name
     * @param level Log level **info**, **debug**
     */
    public static getLogger(loggerName: string): bunyan {

        const reqSerializerInfo = (req: ApiBuilder.AwsProxyRequest): any => {

            if (_.isNil(req.headers)) {
                req.headers = {};
            }

            return {
                method: req.requestContext.httpMethod,
                path: req.requestContext.resourcePath,
                requestContext : {
                    'X-Amz-Cf-Id' : req.headers[ 'X-Amx-Cf-Id' ],
                    'requestId' : req.requestContext.requestId
                }
            };
        };

        const reqSerializerDebug = (req: ApiBuilder.AwsProxyRequest): any => {

            if (_.isNil(req.headers)) {
                req.headers = {};
            }

            return {
                body: req.body,
                method: req.requestContext.httpMethod,
                path: req.requestContext.resourcePath,
                params: {
                    path: req.pathParameters,
                    query: req.queryStringParameters
                },
                requestContext : {
                    'X-Amz-Cf-Id' : req.headers[ 'X-Amx-Cf-Id' ],
                    'requestId' : req.requestContext.requestId
                }
            };
        };

        const logger = bunyan.createLogger({ name : loggerName });

        switch (Config.LOG_LEVEL) {

            case 'info' :
                logger.level(bunyan.INFO);
                logger.addSerializers({req: reqSerializerInfo});

                break;

            case 'debug':
                logger.level(bunyan.DEBUG);
                logger.addSerializers({req: reqSerializerDebug});

                break;

            default:
                throw new Error('Unknown log level');
        }

        return logger;
    }
}
