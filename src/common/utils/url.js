export const getBaseUrl = () => {
  const PRODUCTION = process.env.NODE_ENV === 'production';
  const STAGING = !!process.env.REACT_APP_STAGING;

  let baseUrl = 'https://iqa-server.intocode.ru/';

  if (!PRODUCTION || STAGING) {
    baseUrl = 'http://localhost:3030/';
  }

  return baseUrl;
};
