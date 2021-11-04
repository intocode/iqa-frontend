import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './index';
import { LS_TOKEN_KEY } from '../../constants';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN_KEY));

  const setAuthToken = useCallback((newToken) => {
    setToken(newToken);
  }, []);

  // реакция на смену токена
  useEffect(() => {
    axios.defaults.headers.authorization = `Bearer ${token}`;
    localStorage.setItem(LS_TOKEN_KEY, token);
  }, [token]);

  // перехватчик axios на случай, если слетит авторизация
  useEffect(() => {
    axios.interceptors.response.use(null, (error) => {
      if (error.response?.status === 401) {
        setAuthToken(null);
      }

      return Promise.reject(error);
    });
  }, [setAuthToken]);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
