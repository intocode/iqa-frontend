import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from './index';
import { LS_TOKEN_KEY } from '../../constants';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN_KEY));

  const setAuthToken = useCallback((newToken) => {
    setToken(() => {
      if (newToken) {
        axios.defaults.headers.authorization = `Bearer ${newToken}`;
        localStorage.setItem(LS_TOKEN_KEY, newToken);
      } else {
        axios.defaults.headers.authorization = ``;
        localStorage.removeItem(LS_TOKEN_KEY);
      }

      return newToken;
    });
  }, []);

  // перехватчик axios на случай, если слетит авторизация
  useEffect(() => {
    axios.interceptors.response.use(null, (error) => {
      if (error.response?.status === 401) {
        setToken(null);
      }

      return Promise.reject(error);
    });
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
