import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalStyle from './ui/GlobalStyle';

// context providers
import { AuthDataProvider } from './modules/authentication/contexts/auth-context';
import { AlertsProvider } from './modules/alerts/AlertsProvider';

// config dexie
import { db, stores } from './indexedDB';
db.version(1).stores(stores);

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <AuthDataProvider>
         <AlertsProvider>
            <App />
         </AlertsProvider>
      </AuthDataProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
