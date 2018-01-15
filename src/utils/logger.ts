/*
 * Copyright 2018 Riotz Works.
 */
/* tslint:disable: 
 *   no-any
 *   no-void-expression
 *   no-unbound-method 
 */
import * as bunyan from 'bunyan';
import * as ApiBuilder from 'claudia-api-builder';
import * as _ from 'lodash';
import Config from '../config';

const infoLevelReqSerializer = (req: ApiBuilder.AwsProxyRequest): any => {

  return {
    method: req.requestContext.httpMethod,
    path: req.requestContext.resourcePath,
    contextMap: {
      'requestId': req.requestContext.requestId,
      'sourceIp': req.requestContext.identity.sourceIp,
      'X-Amz-Cf-Id': req.headers['X-Amz-Cf-Id'],
      'X-Amzn-Trace-Id': req.headers['X-Amzn-Trace-Id']
    }
  };
};

const debugLevelReqSerializer = (req: ApiBuilder.AwsProxyRequest): any => {

  const requestContext = {
    method: req.requestContext.httpMethod,
    path: req.requestContext.resourcePath,
    body: req.body,
    pathParams: req.pathParameters,
    queryParams: req.queryStringParameters,
    contextMap: {
      'requestId': req.requestContext.requestId,
      'sourceIp': req.requestContext.identity.sourceIp,
      'X-Amz-Cf-Id': req.headers['X-Amz-Cf-Id'],
      'X-Amzn-Trace-Id': req.headers['X-Amzn-Trace-Id']
    }
  };

  return _.omitBy(requestContext, _.isNil);
};

/**
 * Class for providing a suitable logger for each environment.
 */
export default class Logger {

  /** Logger */
  private logger: bunyan;

  /** AWS proxy request object from API Gateway */
  private awsProxyRequest: ApiBuilder.AwsProxyRequest;

  /** Flag if log with context */
  private withContext: boolean;

  constructor(name: string, awsProxyRequest?: ApiBuilder.AwsProxyRequest) {
    this.logger = bunyan.createLogger({ name, err: bunyan.stdSerializers.err });
    this.withContext = false;

    if (!_.isNil(awsProxyRequest)) {
      this.withRequestContext(awsProxyRequest);
    }
  }

  /**
   * Set the given request context to logger.
   *
   * logger will append the request context to each log items, with a key of 'req'.
   * This will help you to trace the process sequence of a certain API call.
   *
   * @param awsProxyRequest AWS Proxy Request from API Gateway
   */
  public withRequestContext(awsProxyRequest: ApiBuilder.AwsProxyRequest): Logger {
    this.awsProxyRequest = awsProxyRequest;
    this.withContext = true;

    switch (Config.LOG_LEVEL) {

      case 'info':
        this.logger.level(bunyan.INFO);
        this.logger.addSerializers({ req: infoLevelReqSerializer });
        break;

      case 'debug':
        this.logger.level(bunyan.DEBUG);
        this.logger.addSerializers({ req: debugLevelReqSerializer });
        break;

      default:
        throw new Error('Unknown log level');
    }

    return this;
  }

  /**
   * Log a message object with the info level.
   *
   * @param args message objects to log
   */
  public info(...args: any[]): void {
    this.withContext ?
      this.logger.info({ req: this.awsProxyRequest }, ...args) : this.logger.info(args);
  }

  /**
   * Log a message object with the debug level.
   *
   * @param args message objects to log
   */
  public debug(...args: any[]): void {
    this.withContext ? this.logger.debug({ req: this.awsProxyRequest }, ...args) : this.logger.debug(args);
  }

  /**
   * Log a message object with the error level.
   *
   * @param args message objects to log
   */
  public warn<T extends Error>(err: { err: T }, ...args: any[]): void {
    this.withContext ? this.logger.warn({ req: this.awsProxyRequest, err }, ...args) : this.logger.warn(args);
  }

  /**
   * Log a message object with the error level.
   *
   * @param args message objects to log
   */
  public error<T extends Error>(err: { err: T }, ...args: any[]): void {
    this.withContext ? this.logger.error({ req: this.awsProxyRequest, err }, ...args) : this.logger.error(args);
  }

  /**
   * Log a message object with the fatal level.
   *
   * @param args message objects to log
   */
  public fatal<T extends Error>(err: { err: T }, ...args: any[]): void {
    this.withContext ? this.logger.fatal({ req: this.awsProxyRequest, err }, ...args) : this.logger.fatal(args);
  }
}
