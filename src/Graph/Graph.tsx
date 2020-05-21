import React, { useRef, useEffect } from 'react';
import Venue from '../Venue/Venue';
import Similars from '../Venue/Similars';
import Render from './Render';
import './Graph.css';
import { GRAPHTESTID, GRAPHINTERVAL, GRAPHLIMIT } from '../constants';

interface Props {
  items: Venue[],
  clientId: string,
  clientSecret: string,
  limit: number,
  timeout: number,
  similars: Similars,
  render: Render,
  setItems: (items: Venue[]) => void
  setError: (error: boolean) => void
}

const Graph = (props: Props) => {
  const {
    items,
    clientId,
    clientSecret,
    limit,
    timeout,
    similars,
    render,
    setItems,
    setError
  } = props;

  const svg: any = useRef<SVGSVGElement>(null);
  const clock: any = useRef<number>(0);

  // Helper to extract an array of IDs from a collection of items.
  const ids = (items: Venue[]): string[] => items.map((item: Venue) => item.id);

  // Checks if the space key has been pressed and empties the lst of items.
  useEffect(() => {
    document.addEventListener('keydown', (e: any) => {
      if (e.key !== ' ') return
      clearTimeout(clock.current);
      setItems([])
    }, false);
  }, [setItems]);

  // Happens every time the item collection changes, or every time the update
  // interval is triggered.
  useEffect(() => {
    if (!items.length || items.length > limit) return;
    const current = items[0];
    const { id } = current;

    // Search for places and set the list of similar items, with the current
    // element, the first one, in the end of the new list.
    similars.get(clientId, clientSecret, id).then((results: Venue[]) => {
      const updated: Venue[] = [
        ...items.filter((item: Venue) => item.id !== id),
        ...results.filter((result: Venue) => !ids(items).includes(result.id)),
        { ...current, links: ids(results) }
      ];
      // Render the graph and set the interval to fetch the next place.
      render.draw(svg.current, updated);
      clock.current = window.setTimeout(() => setItems(updated), timeout);

      setError(false);
    }).catch((error: any) => {
      setItems([]);
      setError(true);
    });
  }, [
    items,
    clientId,
    clientSecret,
    limit,
    timeout,
    similars,
    render,
    setItems,
    setError
  ]);

  return (
    <svg className={GRAPHTESTID} data-testid={GRAPHTESTID} ref={svg}></svg>
  );
}

Graph.defaultProps = {
  items: [],
  clientId: '',
  clientSecret: '',
  limit: GRAPHLIMIT,
  timeout: GRAPHINTERVAL,
  similars: new Similars(),
  render: new Render(),
  setItems: (items: Venue[]) => {},
  setError: (error: boolean) => {}
};

export default Graph;
