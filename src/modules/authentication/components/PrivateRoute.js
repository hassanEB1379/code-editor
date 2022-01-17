import { Redirect, Route } from 'react-router-dom';
import { useState } from '@hookstate/core';
import { authState } from '../states';

export const PrivateRoute = props => {
   const auth = useState(authState);
   const { component: Component, ...rest } = props;

   const render = renderProps => {
      if (!auth.promised && auth.isAuthenticated.get()) {
         return <Component {...renderProps} />;
      } else {
         // redirect to login page if user not logged in
         return <Redirect to="/login" />;
      }
   };

   return <Route {...rest} render={render} />;
};
