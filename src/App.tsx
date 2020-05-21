import React, { useState } from 'react';
import Form from './Form/Form';
import Graph from './Graph/Graph';
import Venue from './Venue/Venue';
import './App.css';
import { TITLE, ERROR } from './constants';

interface Props {
  clientId: string,
  clientSecret: string,
  items: Venue[]
}

const App = (props: Props) => {
  // API authentication details and error.
  const [clientId, setClientId] = useState<string>(props.clientId);
  const [clientSecret, setClientSecret] = useState<string>(props.clientSecret);
  const [error, setError] = useState<boolean>(false);
  // Places shown in the graph.
  const [items, setItems] = useState<Venue[]>(props.items);
  // Helper to reset the graph place with one item.
  const setSeed = (item: Venue) => setItems([item]);

  return (
    <div className='App'>
      { /* Show the form if there are no places or the graph otherwise. */
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
  clientId: 'GYEYQKXD2FV1QEIOZKEI0M3MUXRID1OWGJS5Z0JSRJYDMT0X',
  clientSecret: 'YGUU11DLLKJK3DUVNGUK03OXT11WROWEDO0MTE225N5DL5GP',
  items: []
};

export default App;
