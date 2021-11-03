import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './index';
import { LS_TOKEN_KEY } from '../../constants';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN_KEY));

  const setAuthToken = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem(LS_TOKEN_KEY, newToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
