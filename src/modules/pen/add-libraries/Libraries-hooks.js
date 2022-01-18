import { useEffect, useState } from 'react';
import { useState as useHookState } from '@hookstate/core';
import { penState } from '../states';
import { useCustomAlert } from '../../alerts/useCustomAlert';

/*
 * add cdn url of library to cdn array and show success alert
 * */

export function useAddLibrary() {
   const pen = useHookState(penState);
   const { showSuccessAlert } = useCustomAlert();

   return function add(library) {
      pen.libraries.merge([library]);
      showSuccessAlert(`${library.name} added successfully`);
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
