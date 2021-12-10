import { useEffect, useState } from 'react';

export function useFetch(url) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      fetch(url)
         .then(res => res.json())
         .then(res => {
            setData(res);
            setLoading(false);
         })
         .catch(err => {
            setError(err);
            setLoading(false);
         });
   }, [url]);

   return { data, loading, error };
}
