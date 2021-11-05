import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalStyle from './ui/GlobalStyle';

// context providers
import { AuthDataProvider } from './modules/authentication/contexts/auth-context';

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <AuthDataProvider>
         <App />
      </AuthDataProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
