import { Redirect, Route } from 'react-router-dom';
import { useAuthData } from '../contexts/auth-context';

export const PrivateRoute = props => {
   const { component: Component, ...rest } = props;

   const { isAuthenticated } = useAuthData();

   const render = renderProps => {
      if (isAuthenticated) {
         return <Component {...renderProps} />;
      } else {
         // redirect to login page if user not loged in
         return <Redirect to="/login" />;
      }
   };

   return <Route {...rest} render={render} />;
};
