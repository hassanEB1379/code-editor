import { db } from '../../../indexedDB';
import { usePen } from '../contexts/pen-context';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import { useUnsavedChangesDispatch } from '../contexts/unsaved-changes-context';

export function useSave() {
   const pen = usePen();
   const { showSuccessAlert } = useCustomAlert();
   const unsavedChangesDispatch = useUnsavedChangesDispatch();

   return function () {
      // update pen
      db.pens
         .update(pen.id, pen)
         .then(() => {
            // show success alert
            showSuccessAlert('Pen saved');
            // set unsaved changes to 0 after save
            unsavedChangesDispatch(0);
         })
         .catch(err => {
            console.log(err);
         });
   };
}
