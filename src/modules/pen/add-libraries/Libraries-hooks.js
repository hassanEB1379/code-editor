import { useEffect, useState } from 'react';
import { usePen, usePenDispatch } from '../contexts/pen-context';
import { useCustomAlert } from '../../alerts/useCustomAlert';

/*
 * add cdn url of library to cdn array and show success alert
 * */

export function useAddLibrary() {
   const dispatch = usePenDispatch();
   const { showSuccessAlert } = useCustomAlert();

   return function add(library) {
      dispatch({ type: 'add-library', payload: library });
      showSuccessAlert(`${library.name} added successfully`);
   };
}

/*
 * remove library
 * */

export function useRemoveLibrary() {
   const dispatch = usePenDispatch();
   const { showSuccessAlert } = useCustomAlert();

   return function remove(library) {
      dispatch({ type: 'remove-library', payload: library });
      showSuccessAlert(`${library.name} removed`);
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
