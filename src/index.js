import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalStyle from './ui/GlobalStyle';
import Providers from './components/Providers';

// create indexedDB database
import { openDB } from './indexedDB';
openDB();

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <Providers>
         <App />
      </Providers>
   </React.StrictMode>,
   document.body
);
