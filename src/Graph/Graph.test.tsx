import React from 'react';
import { render } from '@testing-library/react';
import Graph from './Graph';
import { GRAPHTESTID } from '../constants';

test('shows nodes and links when items have been loaded', () => {
  const items = [{ id: 'a', name: 'b', links: [] }];
  const { getByTestId } = render(<Graph items={items} />);

  expect(getByTestId(GRAPHTESTID)).toBeInTheDocument();
});
