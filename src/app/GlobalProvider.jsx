import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider } from 'common/context/Auth/AuthProvider';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import { store, persistor } from './store';

export const GlobalProvider = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <BrowserRouter>
                <GlobalStyles />
                {children}
              </BrowserRouter>
            </AuthProvider>
          </PersistGate>
        </ReduxProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
