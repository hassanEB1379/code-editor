import { createContext, useContext, useState } from 'react';

const UnsavedChanges = createContext();
const UnsavedChangesDispatch = createContext();

export const useUnsavedChangesCount = () => useContext(UnsavedChanges);
export const useUnsavedChangesDispatch = () =>
   useContext(UnsavedChangesDispatch);

export function UnsavedChangesProvider({ children }) {
   const [changes, setChanges] = useState(0);

   return (
      <UnsavedChanges.Provider value={changes}>
         <UnsavedChangesDispatch.Provider value={setChanges}>
            {children}
         </UnsavedChangesDispatch.Provider>
      </UnsavedChanges.Provider>
   );
}
