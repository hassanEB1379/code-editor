import { useEffect, useState } from 'react';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import { penState } from '../states';

/*
 * add cdn url of library to cdn array and show success alert
 * */

export function useAddLibrary() {
   const pen = useState(penState);
   const { showSuccessAlert } = useCustomAlert();

   return function add(library) {
      pen.libraries.merge([library]);
      showSuccessAlert(`${library.name} added successfully`);
   };
}

/*
 * change order of libraries
 */

export function useChangeOrder() {
   const dispatch = usePenDispatch();
   const { libraries } = usePen();

   return function changeOrder(a, b) {
      // swap elements
      let tmp = libraries[a];
      libraries[a] = libraries[b];
      libraries[b] = tmp;
      // dispatch new array
      dispatch({ type: 'update-libraries', payload: libraries });
   };
}

/*
 * This hook fetch data from cdnjs api
 * */

export function useFetchCDNJs(text) {
   const [results, setResults] = useState(null);

   useEffect(() => {
      if (text) {
         let url = `https://api.cdnjs.com/libraries/?search=${text}&fields=,description,version,fileType&limit=10`;
         fetch(url)
            .then(res => res.json())
            .then(res => setResults(res.results));
      }
      // if search box in empty hidden menu
      else setResults(null);
   }, [text]);

   return results;
}
