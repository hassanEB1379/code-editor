import { createContext, useContext, useState } from 'react';

/*
 * When you run a command on the console (bottom console bar),
 * this command returns a value that is displayed at the bottom of the input.
 * This context holds this return value
 */

const CommandLineContext = createContext(null);
const CommandLineContextDispatch = createContext(null);

// CL ==> Command Line
export const useCLReturnedValue = () => useContext(CommandLineContext);
export const useCLReturnedValueDispatch = () =>
   useContext(CommandLineContextDispatch);

export function CommandLineProvider({ children }) {
   const [commandReturnedValue, setCommandReturnedValue] = useState('');

   return (
      <CommandLineContext.Provider value={commandReturnedValue}>
         <CommandLineContextDispatch.Provider value={setCommandReturnedValue}>
            {children}
         </CommandLineContextDispatch.Provider>
      </CommandLineContext.Provider>
   );
}
