import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Form from './Form';
import {
  FORMTESTID,
  CLIENTIDPLACEHOLDER,
  CLIENTSECRETPLACEHOLDER,
  QUERYPLACEHOLDER,
  SUBMITBUTTON
} from '../constants';

jest.mock('axios');
afterEach(cleanup);

test('shows a form with client ID, client secret and search query', () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<Form />);
  expect(getByTestId(FORMTESTID)).toBeInTheDocument();
  expect(getByPlaceholderText(CLIENTIDPLACEHOLDER)).toBeInTheDocument();
  expect(getByPlaceholderText(CLIENTSECRETPLACEHOLDER)).toBeInTheDocument();
  expect(getByPlaceholderText(QUERYPLACEHOLDER)).toBeInTheDocument();
  expect(getByText(SUBMITBUTTON)).toBeInTheDocument();
});

test('fails properly if something goes wrong', async () => {
  (axios.get as any).mockImplementation(() => Promise.reject());
  const { findByText, findByTestId } = render(<Form />);
  fireEvent.click(await findByText(SUBMITBUTTON));
  expect(await findByTestId(FORMTESTID)).toBeInTheDocument();
});
