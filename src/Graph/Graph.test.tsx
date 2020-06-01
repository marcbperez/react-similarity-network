import React from 'react';
import axios from 'axios';
import { render, cleanup } from '@testing-library/react';
import Graph from './Graph';
import { GRAPHTESTID, TESTITEMS } from '../constants';

jest.mock('axios');
afterEach(cleanup);

test('stops if there are not items', () => {
  const { getByTestId } = render(<Graph items={[]} />);
  expect(getByTestId(GRAPHTESTID)).toBeInTheDocument();
});

test('fails properly if something goes wrong', async () => {
  (axios.get as any).mockImplementation(() => Promise.reject());
  const { findByTestId } = render(<Graph items={TESTITEMS} />);
  expect(await findByTestId(GRAPHTESTID)).toBeInTheDocument();
});
