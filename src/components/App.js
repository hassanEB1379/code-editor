import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Pen from '../modules/pen/components/Pen';
import {
   PrivateRoute,
   PublicRoute,
   Login,
   Register,
} from '../modules/authentication/components';
import MyWorks from './MyWorks';
import Page404 from './404';

function App() {
   return (
      <BrowserRouter>
         <Switch>
            <PrivateRoute exact path="/my-works" component={MyWorks} />
            <PublicRoute exact restricted path="/login" component={Login} />
            <PublicRoute
               exact
               restricted
               path="/register"
               component={Register}
            />
            <PrivateRoute exact path="/pen/:id" component={Pen} />
            <PublicRoute exact path="/" component={HomePage} />

            {/* not found page */}
            <Route component={Page404} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
