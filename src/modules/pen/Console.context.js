import { createContext, useContext, useState } from 'react';

const toggleConsoleContext = createContext(null);

export const useToggleConsole = () => useContext(toggleConsoleContext);

export function ToggleConsoleProvider(props) {
   const [isOpen, setIsOpen] = useState(false);

   function toggle() {
      setIsOpen(prev => !prev);
   }

   return (
      <toggleConsoleContext.Provider value={{ isOpen, toggle }}>
         {props.children}
      </toggleConsoleContext.Provider>
   );
}
