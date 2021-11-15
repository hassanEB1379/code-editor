import { db } from '../../../indexedDB';
import { usePen } from '../contexts/pen-context';
import { useShowAlert } from '../../alerts/AlertsProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export function useSave() {
   const pen = usePen();
   const showAlert = useShowAlert();

   return function () {
      // update pen
      db.pens
         .update(pen.id, pen)
         .then(() => {
            // show success alert
            showAlert('success', 'Pen saved', {
               icon: (
                  <FontAwesomeIcon
                     size="lg"
                     color="#37F900"
                     icon={faCheckCircle}
                  />
               ),
            });
         })
         .catch(err => {
            console.log(err);
         });
   };
}
