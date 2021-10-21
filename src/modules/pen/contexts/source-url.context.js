import { createContext, useContext, useState } from 'react';
import { getGeneratedPageURL } from '../utils/generatePageUrl';

const SourceUrlContext = createContext(null);
const SourceUrlContextDispatch = createContext(null);

export const useSourceUrl = () => useContext(SourceUrlContext);
export const useSourceUrlDispatch = () => useContext(SourceUrlContextDispatch);

export function SourceUrlProvider({ children }) {
   const [url, setUrl] = useState(getGeneratedPageURL());

   return (
      <SourceUrlContext.Provider value={url}>
         <SourceUrlContextDispatch.Provider value={setUrl}>
            {children}
         </SourceUrlContextDispatch.Provider>
      </SourceUrlContext.Provider>
   );
}
