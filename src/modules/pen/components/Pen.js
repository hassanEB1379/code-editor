import styled from 'styled-components';
import Header from './Header';
import Flex from '../../../ui/Flex';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';
import { useEffect } from 'react';
import { useRun } from '../hooks/useRun';

const MainWrapper = styled(Flex).attrs(() => ({
   flexDir: 'column',
   justifyContent: 'space-between',
}))`
   height: 100vh;
   background-color: var(--dark-bg);
`;

const Pen = () => {
   const run = useRun();

   useEffect(() => {
      function handleShortcuts(e) {
         if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            // save
         } else if (e.shiftKey && e.keyCode === 121) {
            e.preventDefault();
            // run
            run();
         }
      }

      window.addEventListener('keydown', handleShortcuts);

      return () => {
         window.removeEventListener('keydown', handleShortcuts);
      };
   }, [run]);

   return (
      <MainWrapper>
         <Header />

         <ViewLayout />

         <Footer />
      </MainWrapper>
   );
};

export default Pen;
