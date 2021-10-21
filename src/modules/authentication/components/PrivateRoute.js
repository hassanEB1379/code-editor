import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = props => {
   const { component: Component, ...rest } = props;

   const authenticated = true;

   const render = renderProps => {
      if (authenticated) {
         return <Component {...renderProps} />;
      } else {
         // redirect to login page if user not loged in
         return <Redirect to="/login" />;
      }
   };

   return <Route {...rest} render={render} />;
};
