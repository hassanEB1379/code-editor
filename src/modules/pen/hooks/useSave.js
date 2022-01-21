import { useState } from '@hookstate/core';
import { penState, unsavedChangesState } from '../states';
import { db } from '../../../indexedDB';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import { calcTime } from '../utils/calcTime';

export function useSave() {
   const pen = useState(penState);
   const unsavedChanges = useState(unsavedChangesState);

   const { showSuccessAlert, showErrorAlert } = useCustomAlert();

   /*
    * indexedDB does not support store proxies
    * thus convert it to normal object with JSON methods
    *  */
   const target = JSON.parse(JSON.stringify(pen.value));
   target.last_save = calcTime(new Date());

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
