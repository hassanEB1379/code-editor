import styled from 'styled-components';
import Header from '../../Header';
import Flex from '../../ui/Flex';
import Footer from '../../Footer';
import Editor from './Editor';
import OutputView from './OutputView';
import Resizable from '../../ui/Resizable/Resizable';
import Console from './Console';
import { useToggleConsole } from './Console.context';
import { useViewLayout } from './ViewLayout.context';
import { useState } from 'react';

const MainWrapper = styled(Flex).attrs(() => ({
   flexDir: 'column',
   justifyContent: 'space-between',
}))`
   height: 100vh;
`;

const Pen = () => {
   const [html, setHtml] = useState('');
   const [css, setCss] = useState('');
   const [js, setJs] = useState('');

   const { isOpen } = useToggleConsole();

   const { wrapper, editors } = useViewLayout();

   return (
      <MainWrapper>
         <Header />

         <Resizable orientation={wrapper.orientation} minSize={38}>
            <Resizable orientation={editors.orientation} minSize={38}>
               <Editor
                  onChange={code => setHtml(code)}
                  mode="html"
                  name="html-editor"
                  iconSrc="static/images/html-5.svg"
               />

               <Editor
                  onChange={code => setCss(code)}
                  mode="css"
                  name="css-editor"
                  iconSrc="static/images/css-3.svg"
               />

               <Editor
                  onChange={code => setJs(code)}
                  mode="javascript"
                  name="js-editor"
                  iconSrc="static/images/javascript.svg"
               />
            </Resizable>

            <Resizable orientation="vertical">
               <OutputView code={{ html, css, js }} />
               {isOpen && <Console />}
            </Resizable>
         </Resizable>

         <Footer />
      </MainWrapper>
   );
};

export default Pen;
