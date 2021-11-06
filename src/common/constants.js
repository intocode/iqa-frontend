const lsPrefix = 'iqa_';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const BASE_API_URL = PRODUCTION ? '/' : 'http://localhost:3030/';

export const LS_TOKEN_KEY = `${lsPrefix}accessToken`;

export const AUTHORIZE_SERVICE_URL = `${BASE_API_URL}auth/github`;
