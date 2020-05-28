import { useRef, useEffect, RefObject } from 'react';
import { GRAPHINTERVAL, GRAPHLIMIT, SPACEKEY } from '../constants';
import Venue from '../Venue/Venue';
import GraphRender from '../Graph/GraphRender';
import VenueSimilars from '../Venue/VenueSimilars';

type SvgHook = (
  clientId: string,
  clientSecret: string,
  items: Venue[],
  setItems: (items: Venue[]) => void,
  setError: (error: boolean) => void
) => RefObject<SVGSVGElement>;

/**
 * Graph SVG reference hook that updates itself with network connections from
 * similar venues, and can be stopped by pressing the space key.
 */
export const Svg: SvgHook = (
  clientId,
  clientSecret,
  items,
  setItems,
  setError
) => {
  const svg: any = useRef<SVGSVGElement>(null);
  const timer: any = useRef<number>(0);

  // Effect to update the contents of the graph. Happens if the collection is
  // not empty and has less than the maximum amount permitted.
  useEffect(() => {
    if (!items.length || items.length > GRAPHLIMIT) return;

    // We will need the first item as the current one to look for similar
    // venues, the similar venue service, the graph rendering routine, and the
    // event catchers and helpers described below.
    const current: Venue = items[0];
    const venueSimilars: VenueSimilars = new VenueSimilars();
    const graphRender: GraphRender = new GraphRender();

    // A helper to extract a list of ids from a set of venues, used when
    // reordering items to prevent duplicates.
    const ids = (items: Venue[]): string[] => {
      return items.map((item: Venue) => item.id);
    }

    // A helper to reorder the item collection, so that the new similar venues
    // and the current one are added last with no duplicates. This puts the next
    // element at the top, and new similars can be retrieved in the next render.
    const reOrder = (similars: Venue[]): Venue[] => {
      return [
        ...items.filter((item: Venue) => item.id !== current.id),
        ...similars.filter((item: Venue) => !ids(items).includes(item.id)),
        { ...current, links: ids(similars) }
      ];
    };

    // An event catcher to handle the results from loading the venue similars,
    // reordering them and drawing the result onto the grap, using the graph
    // rendering routine. It then starts a timer that will load the reordered
    // collection, triggering the search and render for the next item.
    const onSuccess = (similars: Venue[]) => {
      const updated: Venue[] = reOrder(similars);
      graphRender.draw(svg.current, updated);
      timer.current = window.setTimeout(() => setItems(updated), GRAPHINTERVAL);
      setError(false);
    };

    // An event catcher for response errors that resets the app back to the
    // search form, and makes the error message appear.
    const onError = () => {
      clearTimeout(timer.current);
      setItems([]);
      setError(true);
    };

    // An event catcher for the space key to that resets the app back to the
    // search form, without the error message.
    const onKeyDown = (event: any) => {
      if (event.key !== SPACEKEY) return;
      clearTimeout(timer.current);
      setItems([]);
      setError(false);
    };

    // We can now bind the space key event to the document.
    document
      .addEventListener('keydown', (event: any) => onKeyDown(event), false);
    // And start loading and drawing recursively the current venue similars, by
    // calling the success event, or going back to the search form and showing
    // an error message if something went wrong.
    venueSimilars
      .get(clientId, clientSecret, current.id)
      .then((similars: Venue[]) => onSuccess(similars))
      .catch((error: any) => onError);

  }, [clientId, clientSecret, items, setItems, setError]);

  // Return the SVG reference so that the hook can be applied to an SVG element.
  return svg;
};
