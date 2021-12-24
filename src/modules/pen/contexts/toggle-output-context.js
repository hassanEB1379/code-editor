import { createContext, useContext, useState } from 'react';

const ToggleOutput = createContext();
const ToggleOutputDispatch = createContext();

export const useToggleOutput = () => useContext(ToggleOutput);
export const useToggleOutputDispatch = () => useContext(ToggleOutputDispatch);

export function ToggleOutputProvider({ children }) {
   const [open, setOpen] = useState(true);

   return (
      <ToggleOutput.Provider value={open}>
         <ToggleOutputDispatch.Provider value={setOpen}>
            {children}
         </ToggleOutputDispatch.Provider>
      </ToggleOutput.Provider>
   );
}
