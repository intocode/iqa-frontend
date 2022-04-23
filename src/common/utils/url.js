export const getBaseUrl = () => {
  const PRODUCTION = process.env.NODE_ENV === 'production';
  const STAGING = !!process.env.REACT_APP_STAGING;

  let baseUrl = 'https://iqa-backend.intocode.ru/';

  if (!PRODUCTION || STAGING) {
    baseUrl = 'https://iqa-stage-backend.intocode.ru/';
  }

  return baseUrl;
};
