import React from 'react';
import {
  FORMTESTID,
  CLIENTIDTYPE,
  CLIENTIDPLACEHOLDER,
  CLIENTIDNAME,
  CLIENTSECRETNAME,
  CLIENTSECRETPLACEHOLDER,
  CLIENTSECRETTYPE,
  QUERYNAME,
  QUERYPLACEHOLDER,
  SUBMITBUTTON
} from '../constants';
import { Items } from '../hooks';
import Input from '../Input/Input';
import Results from '../Results/Results';
import Venue from '../Venue/Venue';
import VenueSearch from '../Venue/VenueSearch';

interface Props {
  clientId: string,
  clientSecret: string,
  query: string,
  venueSearch: VenueSearch,
  items: Venue[],
  setClientId: (clientId: string) => void,
  setClientSecret: (clientSecret: string) => void,
  setResult: (result: Venue) => void,
  setError: (error: boolean) => void
}

/**
 * Search form that obtains a list of venues meant to be used as graph seeds.
 */
const Form = (props: Props) => {
  const {
    clientId,
    clientSecret,
    query,
    venueSearch,
    setClientId,
    setClientSecret,
    setResult,
    setError
  } = props;

  // Result collection to be displayed as possible seed venues.
  const [items, setItems] = Items(props.items);

  // An event catcher to handle the results from loading the venue search,
  // making them available on the list.
  const onSuccess = (
    clientId: string,
    clientSecret: string,
    items: Venue[]
  ) => {
    setClientId(clientId);
    setClientSecret(clientSecret);
    setItems(items);
    setError(false);
  };

  // An event catcher for response errors that resets the result list and shows
  // an error message.
  const onError = () => {
    setItems([]);
    setError(true);
  };

  // An event catcher to read the form when sent, that shows the search results,
  // or an error message if something goes wrong.
  const onSubmit = (event: any) => {
    event.preventDefault();
    // Get the API authentication details and the query to search for.
    const data: FormData = new FormData(event.target);
    const clientId: string = String(data.get(CLIENTIDNAME));
    const clientSecret: string = String(data.get(CLIENTSECRETNAME));
    const query: string = String(data.get(QUERYNAME));
    // Search for venues given the query contents as venue name.
    venueSearch
      .get(clientId, clientSecret, query)
      .then((items: Venue[]) => onSuccess(clientId, clientSecret, items))
      .catch((error: any) => onError());
  };

  // An event catcher for the list item click, to set it as seed venue.
  const onClick = (event: any, result: Venue) => {
    event.preventDefault();
    setResult(result);
  };

  return (
    <form data-testid={FORMTESTID} onSubmit={onSubmit}>
      <Input
        name={CLIENTIDNAME}
        placeholder={CLIENTIDPLACEHOLDER}
        type={CLIENTIDTYPE}
        defaultValue={clientId} />
      <Input
        name={CLIENTSECRETNAME}
        placeholder={CLIENTSECRETPLACEHOLDER}
        type={CLIENTSECRETTYPE}
        defaultValue={clientSecret} />
      <Input
        placeholder={QUERYPLACEHOLDER}
        name={QUERYNAME}
        defaultValue={query} />
      <button>{SUBMITBUTTON}</button>

      {/* List to show the search results in. */}
      <Results items={items} onClick={onClick} />
    </form>
  );
}

Form.defaultProps = {
  clientId: '',
  clientSecret: '',
  query: '',
  venueSearch: new VenueSearch(),
  items: [],
  setClientId: (clientId: string) => {},
  setClientSecret: (clientSecret: string) => {},
  setResult: (result: Venue) => {},
  setError: (error: boolean) => {}
};

export default Form;
