import { usePen } from '../contexts/pen-context';

export function useSave() {
   const pen = usePen();

   return function () {
      localStorage.setItem('pen', JSON.stringify(pen));
   };
}
