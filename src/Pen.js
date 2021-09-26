import styled from 'styled-components';
import Header from './Header';
import Flex from './ui/Flex';
import Footer from './Footer';
import Editor from './Editor';
import OutputView from './OutputView';
import Resizable from './ui/Resizable/Resizable';

const MainWrapper = styled(Flex).attrs(() => ({
   direction: 'column',
   justifyContent: 'space-between',
}))`
   height: 100vh;
`;

const Pen = () => {
   return (
      <MainWrapper>
         <Header />

         <Resizable minSize={38}>
            <Resizable orientation="vertical" minSize={38}>
               <Editor mode="html" iconSrc="static/images/html-5.svg" />

               <Editor mode="css" iconSrc="static/images/css-3.svg" />

               <Editor
                  mode="javascript"
                  iconSrc="static/images/javascript.svg"
               />
            </Resizable>

            <OutputView />
         </Resizable>

         <Footer />
      </MainWrapper>
   );
};

export default Pen;
