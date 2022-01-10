import { getGeneratedPageURL } from '../utils/generatePageUrl';
import { useState } from '@hookstate/core';
import { penState, sourceUrlState } from '../states';

export function useRun() {
   const pen = useState(penState);
   const sourceUrl = useState(sourceUrlState);

   function run() {
      sourceUrl.set(getGeneratedPageURL(pen.code.get(), pen.libraries.get()));
   }

   return run;
}
