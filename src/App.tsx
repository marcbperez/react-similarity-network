import React from 'react';
import './App.css';
import { TITLE, ERROR } from './constants';
import { ClientId, ClientSecret, Items, Error } from './hooks';
import Form from './Form/Form';
import Graph from './Graph/Graph';
import Venue from './Venue/Venue';

interface Props {
  clientId: string,
  clientSecret: string,
  error: boolean,
  items: Venue[]
}

/**
 * Searches for a seed venue and starts drawing a similarity network graph.
 */
const App = (props: Props) => {
  // API client authentication data and error.
  const [clientId, setClientId] = ClientId(props.clientId);
  const [clientSecret, setClientSecret] = ClientSecret(props.clientSecret);
  const [error, setError] = Error(props.error);
  // Item collection to be displayed on the graph.
  const [items, setItems] = Items(props.items);

  // Helper that sets the seed by adding a single item to an empty collection.
  const setSeed = (item: Venue) => setItems([item]);

  return (
    <div className='App'>
      { // Show the search form to find a seed venue if the item collection is
        // empty. In case something went wrong, the graph will never be shown
        // and an error message will appear here.
        !items.length ?
        <>
          <h1>{TITLE}</h1>
          <Form
            clientId={clientId}
            setClientId={setClientId}
            clientSecret={clientSecret}
            setClientSecret={setClientSecret}
            setResult={setSeed}
            setError={setError} />
          { error && <p>{ERROR}</p> }
        </> :
        // Show the graph if the item collection is not empty.
        <Graph
          clientId={clientId}
          clientSecret={clientSecret}
          items={items}
          setItems={setItems}
          setError={setError} /> }
    </div>
  );
}

App.defaultProps = {
  clientId: '',
  clientSecret: '',
  error: false,
  items: []
};

export default App;
