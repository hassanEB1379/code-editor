import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../indexedDB';
import { useParams } from 'react-router-dom';

export function useLastSaveTime() {
   const params = useParams();
   return useLiveQuery(async () => {
      let pen = await db.pens.get(params.id);
      if (pen) return pen.last_save;
   });
}
