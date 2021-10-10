import { createContext, useContext, useReducer } from 'react';

const ConsoleLogsContext = createContext();
const ConsoleLogsContextDispatch = createContext();

export const useConsoleLogs = () => useContext(ConsoleLogsContext);
export const useConsoleLogsDispatch = () =>
   useContext(ConsoleLogsContextDispatch);

const initialLogs = [];

function consoleLogsReducer(state, action) {
   switch (action.type) {
      case 'error':
         return [...state, { ...action.payload }];
      case 'warning':
         return [...state, { ...action.payload }];
      case 'log':
         return [...state, { ...action.payload }];
      case 'clear':
         return initialLogs;

      default:
         throw new Error('unexpected type');
   }
}

export function ConsoleLogsProvider({ children }) {
   const [logs, dispatch] = useReducer(consoleLogsReducer, initialLogs);

   return (
      <ConsoleLogsContext.Provider value={logs}>
         <ConsoleLogsContextDispatch.Provider value={dispatch}>
            {children}
         </ConsoleLogsContextDispatch.Provider>
      </ConsoleLogsContext.Provider>
   );
}
