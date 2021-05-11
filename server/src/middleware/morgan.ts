import { RequestHandler } from 'express';
import { memoize } from 'lodash';
import morgan from 'morgan';

import { appConfig, morganConfig } from '../config';

const getStatusColor = (statusCode: number): number => {
  if (statusCode >= 500) {
    return 31; // red
  }
  if (statusCode >= 400) {
    return 33; // yellow
  }
  if (statusCode >= 300) {
    return 36; // cyan
  }
  if (statusCode >= 200) {
    return 32; // green
  }
  return 0;
};

const getColorFn = memoize((statusCode: number): morgan.FormatFn => {
  const color = getStatusColor(statusCode);
  return morgan.compile(
    `\x1b[0m:date[iso] - :method: [:pid] \x1b[${color}m:code\x1b[0m :url (:response-time ms)\x1b[0m`,
  );
});

const defaultFormat = ':date[iso] - :method: :code :url (:response-time ms)';

export const middleware = (): RequestHandler => {
  if (
    appConfig.environment === 'test' ||
    appConfig.environment === 'production'
  ) {
    return (req, res, next) => next();
  }

  if (appConfig.environment !== 'local') {
    return morgan(morganConfig.format || defaultFormat, { immediate: true });
  }

  morgan.token('code', (req, res) =>
    res && res.statusCode ? res.statusCode.toString() : '???',
  );

  morgan.token('pid', () => String(process.pid));

  morgan.format('local', (tokens, req, res) =>
    getColorFn(res && res.statusCode)(tokens, req, res),
  );

  return morgan('local');
};
