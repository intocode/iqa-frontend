export const getBaseUrl = () => {
  const PRODUCTION = process.env.NODE_ENV === 'production';
  const STAGING = !!process.env.REACT_APP_STAGING;

  let baseUrl = 'https://iqa-be.herokuapp.com/';

  if (!PRODUCTION || STAGING) {
    baseUrl = 'https://iqa-backend.herokuapp.com/';
  }

  return baseUrl;
};
