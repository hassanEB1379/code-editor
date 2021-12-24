import { usePen } from '../contexts/pen-context';
import { useSourceUrlDispatch } from '../contexts/source-url-context';
import { getGeneratedPageURL } from '../utils/generatePageUrl';

export function useRun() {
   const { code, libraries } = usePen();
   const setUrl = useSourceUrlDispatch();

   function run() {
      setUrl(getGeneratedPageURL(code, libraries));
   }

   return run;
}
