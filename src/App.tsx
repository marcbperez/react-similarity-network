import React, { useState } from 'react';
import Venue from './Venue/Venue';
import Form from './Form/Form';
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

  return (
    <div className='App'>
      <h1>{TITLE}</h1>
      <Form
        clientId={clientId}
        setClientId={setClientId}
        clientSecret={clientSecret}
        setClientSecret={setClientSecret}
        setError={setError} />
      { error && <p>{ERROR}</p> }
    </div>
  );
}

App.defaultProps = {
  clientId: '',
  clientSecret: '',
  items: []
};

export default App;
