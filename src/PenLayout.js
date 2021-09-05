import styled from 'styled-components';
import Header from './Header';
import Flex from './Flex';
import Footer from './Footer';

const MainWrapper = styled(Flex).attrs(() => ({
   direction: 'column',
   justifyContent: 'space-between',
}))`
   min-height: 100vh;
`;

const ContentWrapper = styled.div`
   flex-grow: 1;
   border-bottom: 1px solid var(--dark-border);
`;

const PenLayout = ({ children }) => {
   return (
      <MainWrapper>
         <Header />

         <ContentWrapper>{children}</ContentWrapper>

         <Footer />
      </MainWrapper>
   );
};

export default PenLayout;
