import { useEffect, useState } from 'react';

export function useIDBFetch(query) {
   const [pending, setPending] = useState(true);
   const [error, setError] = useState(false);
   const [response, setResponse] = useState(null);

   useEffect(() => {
      (async function () {
         try {
            const res = await query();
            setResponse(res);
            setPending(false);
         } catch (err) {
            setError(err);
            setPending(false);
         }
      })();
   }, [query]);

   return { pending, error, response };
}
