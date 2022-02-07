import { getBaseUrl } from './utils/url';

const lsPrefix = 'iqa_';

export const BASE_API_URL = getBaseUrl();

export const LS_TOKEN_KEY = `${lsPrefix}accessToken`;

export const AUTHORIZE_SERVICE_URL = `${BASE_API_URL}auth/github`;
