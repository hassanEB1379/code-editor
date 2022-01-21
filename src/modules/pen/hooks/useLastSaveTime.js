import { useState } from '@hookstate/core';
import { penState } from '../states';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../indexedDB';

export function useLastSaveTime() {
   const pen = useState(penState);
   return useLiveQuery(async () => {
      let getPen = await db.pens.get(pen.id.get());
      if (getPen) return getPen.last_save;
   });
}
