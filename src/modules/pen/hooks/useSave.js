import { usePen } from '../contexts/pen-context';

export function useSave() {
   const pen = usePen();

   return function () {
      try {
         // get previous items and remove old pen
         let prevItems = JSON.parse(localStorage.getItem('pens'));
         let newItems = prevItems.filter(prevItem => prevItem.id !== pen.id);

         // push new pen to items
         newItems.push(pen);
         // store new items
         localStorage.setItem('pens', JSON.stringify(newItems));
      } catch (err) {
         console.log(err);
      }
   };
}
