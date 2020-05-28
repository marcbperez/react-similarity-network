import React from 'react';
import { render } from '@testing-library/react';
import { TITLE, FORMTESTID, GRAPHTESTID } from './constants';
import App from './App';

test('shows a title and search form by default', () => {
  const { getByText, getByTestId } = render(<App />);

  expect(getByText(TITLE)).toBeInTheDocument();
  expect(getByTestId(FORMTESTID)).toBeInTheDocument();
});

test('shows a graph when items have been loaded', () => {
  const items = [{ id: 'a', name: 'b', links: [] }];
  const { getByTestId } = render(<App items={items} />);

  expect(getByTestId(GRAPHTESTID)).toBeInTheDocument();
});
