import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AuthProvider } from './common/context/Auth/AuthProvider';
import { theme } from './app/theme';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { store } from './app/store';
import { BASE_API_URL, LS_TOKEN_KEY } from './common/constants';
import { GlobalStyles } from './app/GlobalStyles';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(
  LS_TOKEN_KEY
)}`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <GlobalStyles />
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// fixme: structure folders by redux best practices guide
