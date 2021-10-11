import styled from 'styled-components';
import Header from '../../Header';
import Flex from '../../ui/Flex';
import Footer from '../../Footer';
import ViewLayout from './view-layout/ViewLayout';

const MainWrapper = styled(Flex).attrs(() => ({
   flexDir: 'column',
   justifyContent: 'space-between',
}))`
   height: 100vh;
`;

const Pen = () => {
   return (
      <MainWrapper>
         <Header />

         <ViewLayout />

         <Footer />
      </MainWrapper>
   );
};

export default Pen;
