import React from 'react';
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import { App } from './app/App';
import { BASE_API_URL, LS_TOKEN_KEY } from './app/constants';
import '@testing-library/jest-dom';
import { GlobalProvider } from './app/GlobalProvider';

// import 'bootstrap/dist/css/bootstrap-grid.min.css';

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.authorization = `Bearer ${localStorage.getItem(LS_TOKEN_KEY)}`;

describe('App rendering', () => {
  it('renders without crash', async () => {
    const { container } = render(
      <GlobalProvider>
        <App />
      </GlobalProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('.placeholder')).toBeInTheDocument();
    });
  });
});
