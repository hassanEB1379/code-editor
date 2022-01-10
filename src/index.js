import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './components/App';
import AlertsContainer from './modules/alerts/AlertsContainer';
import { db, stores } from './indexedDB';

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
      <AlertsContainer />
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);

serviceWorkerRegistration.register();
