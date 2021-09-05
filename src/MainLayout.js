import styled from 'styled-components';
import Header from './Header';

const MainWrapper = styled.div`
   min-height: 100vh;
`;

const ContentWrapper = styled.div``;

const MainLayout = ({ children }) => {
   return (
      <MainWrapper>
         <Header />
         <ContentWrapper>{children}</ContentWrapper>
      </MainWrapper>
   );
};

export default MainLayout;
