import { Button, Flex } from '../ui';
import { Link } from 'react-router-dom';

function Page404() {
   return (
      <Flex gap="1.5rem" flexDir="column" items="center" justify="center">
         <h1>404</h1>
         <h2>Page not found</h2>
         <Link to="/">
            <Button>Go home</Button>
         </Link>
      </Flex>
   );
}

export default Page404;
