import { Boom, boomify, forbidden } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';

import { logger } from '../components';
import { appConfig } from '../config';

const parseError = (error: Error | Boom | any): Boom =>
  error instanceof Boom
    ? error
    : boomify(new Error(error), {
        statusCode: error.status || error.statusCode || 500,
      });

export const middleware =
  (): ErrorRequestHandler => (error: Error | Boom | any, req, res, next) => {
    if (!error) {
      return next();
    }

    logger.error('middleware(error):', error);

    if (error?.message === 'CORS') {
      error = forbidden('CORS');
    }

    const { output } = parseError(error);

    return res.status(output.statusCode).json({
      ...output.payload,
      stack:
        appConfig.environment === 'local'
          ? (error.stack || '').split(/\n\s+/g)
          : undefined,
    });
  };
