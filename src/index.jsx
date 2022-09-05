import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import { App } from './app/App';
import { BASE_API_URL, LS_TOKEN_KEY } from './app/constants';

import '@toast-ui/editor/dist/toastui-editor.css';
import './assets/toast-ui-iqa-theme.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'antd/dist/antd.min.css';
import { GlobalProvider } from './app/GlobalProvider';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(LS_TOKEN_KEY)}`;

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root')
);

// fake
