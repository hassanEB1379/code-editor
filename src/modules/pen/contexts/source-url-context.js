import { createContext, useContext, useState } from 'react';
import { getGeneratedPageURL } from '../utils/generatePageUrl';

// this context hold url of generated document
const SourceUrlContext = createContext();
const SourceUrlContextDispatch = createContext();

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
