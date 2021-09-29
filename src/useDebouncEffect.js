import { useEffect } from 'react';

function useDebounceEffect(func, delay, deps) {
   useEffect(() => {
      const timer = setTimeout(() => func.apply(), delay);

      return () => {
         clearTimeout(timer);
      };
   }, deps);
}

export default useDebounceEffect;
