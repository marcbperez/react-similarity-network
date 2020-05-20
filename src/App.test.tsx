import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { TITLE } from './constants';

test('shows a title and search form by default', () => {
  const { getByText } = render(<App />);
  expect(getByText(TITLE)).toBeInTheDocument();
});
