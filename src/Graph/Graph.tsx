import React, { RefObject } from 'react';
import { Svg } from './GraphHooks';
import { GRAPHTESTID } from '../constants';
import Venue from '../Venue/Venue';

interface Props {
  clientId: string,
  clientSecret: string,
  items: Venue[],
  setItems: (items: Venue[]) => void
  setError: (error: boolean) => void
}

/**
 * Similarity network graph, recursively drawn on an SVG using D3.
 */
const Graph = (props: Props) => {
  const { clientId, clientSecret, items, setItems, setError } = props;

  // SVG element and effect that renders the graph.
  const svg: RefObject<SVGSVGElement> = Svg(
    clientId,
    clientSecret,
    items,
    setItems,
    setError
  );

  return (
    <svg data-testid={GRAPHTESTID} ref={svg}></svg>
  );
}

Graph.defaultProps = {
  clientId: '',
  clientSecret: '',
  items: [],
  setItems: (items: Venue[]) => {},
  setError: (error: boolean) => {}
};

export default Graph;
