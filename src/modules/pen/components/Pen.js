import Header from './Header';
import { Flex } from '../../../ui';
import Footer from './Footer';
import ViewLayout from '../view-layout/ViewLayout';
import { useEffect } from 'react';
import { useRun } from '../hooks/useRun';
import { useSave } from '../hooks/useSave';

const Pen = () => {
   const run = useRun();
   const save = useSave();

   useEffect(() => {
      function handleShortcuts(e) {
         if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            // save
            save();
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
   }, [run, save]);

   return (
      <Flex flexDir="column">
         <Header />

         <ViewLayout />

         <Footer />
      </Flex>
   );
};

export default Pen;
