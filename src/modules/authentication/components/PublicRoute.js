import { Redirect, Route } from 'react-router-dom';
import { useAuthData } from '../contexts/auth-context';

export const PublicRoute = props => {
   const { component: Component, restricted = false, ...rest } = props;

   const { isAuthenticated } = useAuthData();

   const render = renderProps => {
      if (isAuthenticated && restricted) {
         // return user to editor if user authenticated
         return <Redirect to="/my-works" />;
      } else {
         return <Component {...renderProps} />;
      }
   };

   return <Route {...rest} render={render} />;
};
