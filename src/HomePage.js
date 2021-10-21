import Flex from './ui/Flex';
import styled from 'styled-components';
import Button from './ui/Button';

const HomeWrapper = styled(Flex)`
   max-width: 80rem;
   margin: 0 auto;
   padding-top: 3rem;
   min-height: 100vh;
`;

const HomeGradient = styled.div`
   background-image: linear-gradient(0deg, #141e30 0%, #243b55 100%);
`;

function HomePage() {
   return (
      <HomeGradient>
         <HomeWrapper flexDir="column" gap="1.5rem">
            <Flex items="center" justify="space-between">
               <Flex flexDir="column" inline>
                  <h1>Online code editor</h1>
                  <p>online code editor for web development</p>
               </Flex>

               <Flex gap="1rem">
                  <Button>Login</Button>
                  <Button>Register</Button>
               </Flex>
            </Flex>
            <img alt="home-page-img" src="/static/images/home-img.png" />
         </HomeWrapper>
      </HomeGradient>
   );
}

export default HomePage;
