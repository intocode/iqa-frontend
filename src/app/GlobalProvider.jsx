import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider } from '../common/context/Auth/AuthProvider';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import { store } from './store';

export const GlobalProvider = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <GlobalStyles />
              {children}
            </BrowserRouter>
          </AuthProvider>
        </ReduxProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
