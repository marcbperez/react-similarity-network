import React, { useState } from 'react';
import Venue from '../Venue/Venue';
import Search from '../Venue/Search';
import Input from './Input';
import Results from './Results';
import './Form.css';
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

interface Props {
  clientId: string,
  clientSecret: string,
  query: string,
  search: Search,
  items: Venue[],
  setClientId: (clientId: string) => void,
  setClientSecret: (clientSecret: string) => void,
  setResult: (result: Venue) => void,
  setError: (error: boolean) => void
}

const Form = (props: Props) => {
  const {
    clientId,
    clientSecret,
    query,
    search,
    setClientId,
    setClientSecret,
    setResult,
    setError
  } = props;

  // Search results shown in the list after a query.
  const [items, setItems] = useState<Venue[]>(props.items);

  // Form submit action.
  const onSubmit = (e: any) => {
    e.preventDefault();

    const data: FormData = new FormData(e.target);
    const clientId: string = String(data.get(CLIENTIDNAME));
    const clientSecret: string = String(data.get(CLIENTSECRETNAME));
    const query: string = String(data.get(QUERYNAME));

    // Search for places and set the client ID, client secret and items so that
    // the graph can render.
    search.get(clientId, clientSecret, query).then((items: Venue[]) => {
      setClientId(clientId);
      setClientSecret(clientSecret);
      setItems(items);

      setError(false);
    }).catch((error: any) => {
      setItems([]);
      setError(true);
    });
  };

  // Sets the new graph seed when clicking on a result from the list.
  const onClick = (e: any, result: Venue) => {
    e.preventDefault();
    setResult(result);
  };

  return (
    <form className={FORMTESTID} data-testid={FORMTESTID} onSubmit={onSubmit}>
      {/* Client ID field. */}
      <Input
        name={CLIENTIDNAME}
        placeholder={CLIENTIDPLACEHOLDER}
        type={CLIENTIDTYPE}
        defaultValue={clientId} />
      {/* Client secret field. */}
      <Input
        name={CLIENTSECRETNAME}
        placeholder={CLIENTSECRETPLACEHOLDER}
        type={CLIENTSECRETTYPE}
        defaultValue={clientSecret} />
      {/* Search query field. */}
      <Input
        placeholder={QUERYPLACEHOLDER}
        name={QUERYNAME}
        defaultValue={query} />
      {/* Form submit and results list. */}
      <button>{SUBMITBUTTON}</button>
      <Results items={items} onClick={onClick} />
    </form>
  );
}

Form.defaultProps = {
  clientId: '',
  clientSecret: '',
  query: '',
  search: new Search(),
  items: [],
  setClientId: (clientId: string) => {},
  setClientSecret: (clientSecret: string) => {},
  setResult: (result: Venue) => {},
  setError: (error: boolean) => {}
};

export default Form;
