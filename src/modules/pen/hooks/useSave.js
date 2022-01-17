import { useState } from '@hookstate/core';
import { penState, unsavedChangesState } from '../states';
import { db } from '../../../indexedDB';
import { useCustomAlert } from '../../alerts/useCustomAlert';

export function useSave() {
   const pen = useState(penState);
   const unsavedChanges = useState(unsavedChangesState);

   const { showSuccessAlert, showErrorAlert } = useCustomAlert();

   // Copy target of proxy to normal object
   let target = Object.assign(
      {},
      {
         id: pen.id.get(),
         title: pen.title.get(),
         code: Object.assign({}, pen.code.get()),
         libraries: Object.assign([], pen.libraries.get()),
      }
   );

   return function () {
      // update pen
      db.pens
         .update(pen.id.get(), target)
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
