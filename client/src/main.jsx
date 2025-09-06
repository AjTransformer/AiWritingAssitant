import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import {PrivyProvider} from '@privy-io/react-auth';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmetz5sog01fal50bizsljxqx"
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
      config ={{
        loginMethods:['email','wallet','google','github','twitter'],
        appearance:{
          theme:'dark',
          accentColor: '#696FFD'
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
);