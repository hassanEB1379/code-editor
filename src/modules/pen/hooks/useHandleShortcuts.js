import { useRun } from './useRun';
import { useSave } from './useSave';
import { useEffect } from 'react';

// This hook handle shortcuts
export function useHandleShortcuts() {
   const run = useRun();
   const save = useSave();

   useEffect(() => {
      function handleShortcuts(e) {
         if (e.ctrlKey && e.keyCode === 83) {
            // Ctrl + S ==> pen saved
            e.preventDefault();
            save();
         } else if (e.shiftKey && e.keyCode === 121) {
            // Shift + F10 ==> run code
            e.preventDefault();
            run();
         }
      }
      window.addEventListener('keydown', handleShortcuts);
      return () => {
         window.removeEventListener('keydown', handleShortcuts);
      };
   }, [run, save]);
}
