import { createContext, useContext, useReducer } from 'react';

const SourceCodeContext = createContext();
const SourceCodeContextDispatch = createContext();

export const useSourceCode = () => useContext(SourceCodeContext);
export const useSourceCodeDispatch = () =>
   useContext(SourceCodeContextDispatch);

const initialSource = { html: '', css: '', js: '' };

function sourceCodeReducer(state, action) {
   switch (action.type) {
      case 'html':
         return { ...state, html: action.payload };
      case 'css':
         return { ...state, css: action.payload };
      case 'js':
         return { ...state, js: action.payload };
      default:
         throw new Error('unexpected source type');
   }
}

export function SourceCodeProvider({ children }) {
   const [source, dispatch] = useReducer(sourceCodeReducer, initialSource);

   return (
      <SourceCodeContext.Provider value={source}>
         <SourceCodeContextDispatch.Provider value={dispatch}>
            {children}
         </SourceCodeContextDispatch.Provider>
      </SourceCodeContext.Provider>
   );
}
