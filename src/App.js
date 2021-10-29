import { BrowserRouter, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Pen from './modules/pen/components/Pen';
import {
   PrivateRoute,
   PublicRoute,
   Login,
   Register,
} from './modules/authentication/components';
import MyWorks from './MyWorks';

function App() {
   return (
      <BrowserRouter>
         <Switch>
            <PrivateRoute path="/my-works" component={MyWorks} />
            <PublicRoute restricted path="/login" component={Login} />
            <PublicRoute restricted path="/register" component={Register} />
            <PrivateRoute path="/pen" component={Pen} />
            <PublicRoute path="/" component={HomePage} />
         </Switch>
      </BrowserRouter>
   );
}

export default App;
