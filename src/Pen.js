import styled from 'styled-components';
import Header from './Header';
import Flex from './ui/Flex';
import Footer from './Footer';
import Editor from './Editor';
import OutputView from './OutputView';
import Resizable from './ui/Resizable';

const MainWrapper = styled(Flex).attrs(() => ({
   direction: 'column',
   justifyContent: 'space-between',
}))`
   min-height: 100vh;
`;

const ContentWrapper = styled(Flex)`
   flex-grow: 1;
   border-bottom: 1px solid var(--dark-border);
`;

const EditorsWrapper = styled(Flex).attrs(() => ({ direction: 'column' }))`
   border-right: 1px solid var(--dark-border);
`;

const Pen = () => {
   return (
      <MainWrapper>
         <Header />

         <ContentWrapper>
            <Resizable initialWidth={500}>
               <EditorsWrapper>
                  <Editor mode="html" />
                  <Editor mode="css" />
                  <Editor mode="javascript" />
               </EditorsWrapper>
            </Resizable>

            <OutputView />
         </ContentWrapper>

         <Footer />
      </MainWrapper>
   );
};

export default Pen;
