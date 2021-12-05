import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { App } from './app/App';
import { BASE_API_URL, LS_TOKEN_KEY } from './common/constants';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { GlobalProvider } from './app/GlobalProvider';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(
  LS_TOKEN_KEY
)}`;

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root')
);
