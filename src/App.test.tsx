import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent } from '@testing-library/react';
import {
  TITLE,
  FORMTESTID,
  ERROR,
  GRAPHTESTID,
  SUBMITBUTTON,
  SPACEEVENT,
  TESTITEMS,
  TESTSEARCHDATA,
  TESTSIMILARDATA
} from './constants';
import App from './App';

jest.mock('axios');
afterEach(cleanup);

test('shows a title and search form by default', () => {
  const { getByText, getByTestId } = render(<App />);
  expect(getByText(TITLE)).toBeInTheDocument();
  expect(getByTestId(FORMTESTID)).toBeInTheDocument();
});

test('shows an error message if something went wrong', () => {
  const { getByText } = render(<App error={true} />);
  expect(getByText(ERROR)).toBeInTheDocument();
});

test('searches for venues', async () => {
  const { findByText } = render(<App />);
  // Send the form and search for venues.
  (axios.get as any).mockImplementation(() => Promise.resolve(TESTSEARCHDATA));
  fireEvent.click(await findByText(SUBMITBUTTON));
  // Expect results to be on the list.
  expect(await findByText('1st')).toBeInTheDocument();
  expect(await findByText('2nd')).toBeInTheDocument();
});

test('selects a seed venue', async () => {
  const { findByText, findByTestId } = render(<App />);
  // Send the form and search for venues.
  (axios.get as any).mockImplementation(() => Promise.resolve(TESTSEARCHDATA));
  fireEvent.click(await findByText(SUBMITBUTTON));
  // Click on a seed venue and start loading similars.
  (axios.get as any).mockImplementation(() => Promise.resolve(TESTSIMILARDATA));
  fireEvent.click(await findByText('1st'));
  expect(await findByTestId(GRAPHTESTID)).toBeInTheDocument();
});

test('shows a similarity graph when items have been loaded', async () => {
  (axios.get as any).mockImplementation(() => Promise.resolve(TESTSIMILARDATA));
  const { findByTestId } = render(<App items={TESTITEMS} />);
  expect(await findByTestId(GRAPHTESTID)).toBeInTheDocument();
});

test('resets the app when the space key is pressed', async () => {
  (axios.get as any).mockImplementation(() => Promise.resolve(TESTSIMILARDATA));
  const { findByTestId } = render(<App items={TESTITEMS} />);
  fireEvent.keyDown(await findByTestId(GRAPHTESTID), SPACEEVENT);
  expect(await findByTestId(FORMTESTID)).toBeInTheDocument();
});
