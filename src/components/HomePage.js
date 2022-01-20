import styled from 'styled-components';
import { Box, Button, Text } from '../ui';
import { Link } from 'react-router-dom';

import homeBackground from '../ui/images/oce-background-image-minified.jpg';

const HomeBackground = styled.div`
   background-image: url(${homeBackground});
   background-position: bottom;
   background-size: cover;
   background-repeat: no-repeat;
`;

const HomeWrapper = styled.main`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   min-height: 100vh;
   text-align: center;
   background-color: var(--primary-dark-transparent);
   backdrop-filter: blur(2px);
`;

function HomePage() {
   return (
      <HomeBackground>
         <HomeWrapper>
            <Text as="h1" size="3rem">
               Online code editor
            </Text>
            <Text mt="1rem" as="h2" size="1.5rem">
               A fast and easy to use editor for web development
            </Text>

            <Box mt="3rem" className="flex gap-3">
               <Link to="/login">
                  <Button>Login</Button>
               </Link>
               <Link to="/register">
                  <Button>Register</Button>
               </Link>
            </Box>
         </HomeWrapper>
      </HomeBackground>
   );
}

export default HomePage;
