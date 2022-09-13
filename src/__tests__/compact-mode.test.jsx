import React from 'react';
import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import { App } from '../app/App';
import { BASE_API_URL, LS_TOKEN_KEY } from '../app/constants';
import '@testing-library/jest-dom';
import { GlobalProvider } from '../app/GlobalProvider';

// import 'bootstrap/dist/css/bootstrap-grid.min.css';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(LS_TOKEN_KEY)}`;

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

describe('Header rendering', () => {
  it('renders header', async () => {
    render(
      <GlobalProvider>
        <App />
      </GlobalProvider>
    );

    // дожидаемся подгрузки вопросов
    await waitFor(() => expect(screen.getAllByTestId('question-block')[0]).toBeInTheDocument(), {
      timeout: 4000,
    });

    // кликаем на "Компактный вид"
    fireEvent.click(screen.getByTestId('compact-mode-label'));

    // проверяем остались ли ненужные элементы
    expect(screen.queryAllByTestId('not-for-compact')).toBeInstanceOf(Array);
    expect(screen.queryAllByTestId('not-for-compact').length).toBe(0);
  });
});
