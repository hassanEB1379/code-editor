import { Redirect, Route } from 'react-router-dom';
import { useState } from '@hookstate/core';
import { authState } from '../states';

export const PublicRoute = props => {
   const auth = useState(authState);
   const { component: Component, restricted = false, ...rest } = props;

   const render = renderProps => {
      if (!auth.promised && auth.isAuthenticated.get() && restricted) {
         // return user to editor if user authenticated
         return <Redirect to="/my-works" />;
      } else {
         return <Component {...renderProps} />;
      }
   };

   return <Route {...rest} render={render} />;
};
