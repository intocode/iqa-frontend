const lsPrefix = 'iqa_';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const LS_TOKEN_KEY = `${lsPrefix}accessToken`;

export const AUTHORIZE_SERVICE_URL = PRODUCTION
  ? '/auth/github'
  : 'http://localhost:3030/auth/github';
