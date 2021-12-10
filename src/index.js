import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { db, stores } from './indexedDB';

// global styles
import GlobalStyle from './ui/GlobalStyle';
import './ui/css/responsive-utilities.css';

// context providers
import { AuthDataProvider } from './modules/authentication/contexts/auth-context';
import { AlertsProvider } from './modules/alerts/AlertsProvider';
import { ModalProvider } from './modules/modal/ModalProvider';
import MultiProvider from './utils/MultiProvider';

const providers = [<AuthDataProvider />, <AlertsProvider />, <ModalProvider />];

// config dexie
db.version(1).stores(stores);

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <MultiProvider providers={providers}>
         <App />
      </MultiProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
