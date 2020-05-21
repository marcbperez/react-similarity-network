import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import {
  FORMTESTID,
  CLIENTIDPLACEHOLDER,
  CLIENTSECRETPLACEHOLDER,
  QUERYPLACEHOLDER,
  SUBMITBUTTON,
} from '../constants';

test('shows a form with client ID, client secret and query by default', () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<Form />);

  expect(getByTestId(FORMTESTID)).toBeInTheDocument();
  expect(getByPlaceholderText(CLIENTIDPLACEHOLDER)).toBeInTheDocument();
  expect(getByPlaceholderText(CLIENTSECRETPLACEHOLDER)).toBeInTheDocument();
  expect(getByPlaceholderText(QUERYPLACEHOLDER)).toBeInTheDocument();
  expect(getByText(SUBMITBUTTON)).toBeInTheDocument();
});

test('shows search results when items have been loaded', () => {
  const itemName = 'b';
  const items = [{ id: 'a', name: itemName, links: [] }];
  const { getByTestId, getByText } = render(<Form items={items} />);

  expect(getByTestId(FORMTESTID)).toBeInTheDocument();
  expect(getByText(itemName)).toBeInTheDocument();
});
