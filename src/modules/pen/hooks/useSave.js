import { useState } from '@hookstate/core';
import { penState, unsavedChangesState } from '../states';
import { db } from '../../../indexedDB';
import { useCustomAlert } from '../../alerts/useCustomAlert';

export function useSave() {
   const pen = useState(penState);
   const unsavedChanges = useState(unsavedChangesState);

   const { showSuccessAlert, showErrorAlert } = useCustomAlert();

   return function () {
      // update pen
      db.pens
         .update(pen.id.get(), pen.get())
         .then(() => {
            showSuccessAlert('Pen saved');
            unsavedChanges.set(0);
         })
         .catch(err => {
            showErrorAlert('Saving process failed');
            console.log(err);
         });
   };
}
