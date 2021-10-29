import styled from 'styled-components';
import { Button, Flex } from './ui';
import { Link } from 'react-router-dom';

const HomeWrapper = styled(Flex)`
   max-width: 80rem;
   margin: 0 auto;
`;

function HomePage() {
   return (
      <HomeWrapper pt="3rem" flexDir="column" gap="1.5rem">
         <Flex items="center" justify="space-between">
            <Flex flexDir="column" inline>
               <h1>Online code editor</h1>
               <p>online code editor for web development</p>
            </Flex>

            <Flex gap="1rem">
               <Link to="/login">
                  <Button>Login</Button>
               </Link>

               <Link to="/register">
                  <Button>Register</Button>
               </Link>
            </Flex>
         </Flex>
         <img alt="home-page-img" src="/static/images/home-img.png" />
      </HomeWrapper>
   );
}

export default HomePage;
