import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import App from './app/App';
import { AuthProvider } from './common/context/Auth/AuthProvider';
import { mainTheme } from './components/shared/theme';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <Global />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// fixme: structure folders by redux best practices guide
