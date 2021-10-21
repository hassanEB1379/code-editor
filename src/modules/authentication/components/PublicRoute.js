import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = props => {
   const { component: Component, restricted = false, ...rest } = props;

   const authenticated = true;

   const render = renderProps => {
      if (authenticated && restricted) {
         // return user to editor if user authenticated
         return <Redirect to="/pen" />;
      } else {
         return <Component {...renderProps} />;
      }
   };

   return <Route {...rest} render={render} />;
};
