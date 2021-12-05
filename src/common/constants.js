const lsPrefix = 'iqa_';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const BASE_API_URL = PRODUCTION
  ? 'https://iqa-backend.herokuapp.com/'
  : 'https://iqa-backend.herokuapp.com/';

export const LS_TOKEN_KEY = `${lsPrefix}accessToken`;

export const AUTHORIZE_SERVICE_URL = `${BASE_API_URL}auth/github`;
