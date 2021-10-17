import { useSourceCode } from './source-code.context';
import { useSourceUrlDispatch } from './source-url.context';
import { getGeneratedPageURL } from './utils/generatePageUrl';

export function useRun() {
   const source = useSourceCode();

   const setUrl = useSourceUrlDispatch();

   function run() {
      setUrl(getGeneratedPageURL(source));
   }

   return run;
}
