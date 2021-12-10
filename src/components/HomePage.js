import styled from 'styled-components';
import { Button, Spacing } from '../ui';
import { Link } from 'react-router-dom';

const HomeWrapper = styled(Spacing).attrs(() => ({
   className: 'flex dir-c gap-5',
   pt: '3rem',
}))`
   max-width: 80rem;
   margin: 0 auto;
`;

function HomePage() {
   return (
      <HomeWrapper>
         <div className="flex items-center justify-between">
            <div className="flex inline dir-c">
               <h1>Online code editor</h1>
               <p>online code editor for web development</p>
            </div>

            <div className="flex gap-3">
               <Link to="/login">
                  <Button>Login</Button>
               </Link>

               <Link to="/register">
                  <Button>Register</Button>
               </Link>
            </div>
         </div>
         <Spacing mx="auto">
            <img
               width="1000px"
               alt="home-page-img"
               src="/static/images/home-img.png"
            />
         </Spacing>
      </HomeWrapper>
   );
}

export default HomePage;
