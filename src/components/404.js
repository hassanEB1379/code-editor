import { Button } from '../ui';
import { Link } from 'react-router-dom';

function Page404() {
   return (
      <div className="flex dir-c items-center justify-center gap-5">
         <h1>404</h1>
         <h2>Page not found</h2>
         <Link to="/">
            <Button>Go home</Button>
         </Link>
      </div>
   );
}

export default Page404;
