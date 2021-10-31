import { AuthContext } from './index';
import { useCallback, useContext, useState } from 'react';
import { AUTHORIZE_SERVICE_URL } from '../../constants';

export const useAuth = () => {
  const { token, setAuthToken } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const executeLoggingInProcess = useCallback(() => {
    setIsLoggingIn(true);

    const windowMessageListener = (message) => {
      if(message.data.app === 'iqa') {
        const { accessToken, error } = message.data;

        if(error) {
          console.error(error);
        } else {
          setAuthToken(accessToken);
        }

        window.removeEventListener('message', windowMessageListener);
      }
    };

    window.addEventListener('message', windowMessageListener);

    window.open(AUTHORIZE_SERVICE_URL);
  }, [setAuthToken]);

  const logout = useCallback(() => {
    setAuthToken("");
  }, [setAuthToken]);

  return { token, logout, executeLoggingInProcess, isLoggingIn };
};
