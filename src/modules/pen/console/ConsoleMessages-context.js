import { createContext, useContext, useReducer } from 'react';

const ConsoleMessagesContext = createContext();
const ConsoleMessagesContextDispatch = createContext();

export const useConsoleMessages = () => useContext(ConsoleMessagesContext);
export const useConsoleMessagesDispatch = () =>
   useContext(ConsoleMessagesContextDispatch);

const initialMessages = [];

function consoleMessagesReducer(state, action) {
   switch (action.type) {
      case 'error':
         return [...state, { ...action.payload }];
      case 'warning':
         return [...state, { ...action.payload }];
      case 'log':
         return [...state, { ...action.payload }];
      case 'clear':
         return initialMessages;
      default:
         throw new Error('unexpected type');
   }
}

export function ConsoleLogsProvider({ children }) {
   const [messages, dispatch] = useReducer(
      consoleMessagesReducer,
      initialMessages
   );

   return (
      <ConsoleMessagesContext.Provider value={messages}>
         <ConsoleMessagesContextDispatch.Provider value={dispatch}>
            {children}
         </ConsoleMessagesContextDispatch.Provider>
      </ConsoleMessagesContext.Provider>
   );
}
