import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import App from './app/App';
import { AuthProvider } from './common/context/Auth/AuthProvider';
import { theme } from './app/theme';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { store } from './app/store';
import { BASE_API_URL, LS_TOKEN_KEY } from './common/constants';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(
  LS_TOKEN_KEY
)}`;

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <Global />
          <App />
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// fixme: structure folders by redux best practices guide
