import React from 'react';
import ReactDOM from 'react-dom/client';
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
import '@ant-design/cssinjs';
import { GlobalProvider } from './app/GlobalProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(LS_TOKEN_KEY)}`;

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
