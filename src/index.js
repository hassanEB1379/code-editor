import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './components/App';
import { db, stores } from './indexedDB';

// context providers
import { ModalProvider } from './modules/modal/ModalProvider';
import { AlertsProvider } from './modules/alerts/AlertProvider';

// ace-editor required imports
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-twilight';

// global styles
import GlobalStyle from './ui/GlobalStyle';
import './ui/css/responsive-utilities.css';

// config dexie
db.version(1).stores(stores);

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <AlertsProvider>
         <ModalProvider>
            <App />
         </ModalProvider>
      </AlertsProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

serviceWorkerRegistration.register();
