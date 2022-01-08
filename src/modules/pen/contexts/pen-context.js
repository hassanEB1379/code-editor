import { createContext, useContext, useReducer } from 'react';
import { detectDuplicateObject } from '../../../utils/detectDuplicateObject';

const PenContext = createContext();
const PenContextDispatch = createContext();

export const usePen = () => useContext(PenContext);
export const usePenDispatch = () => useContext(PenContextDispatch);

export const initialPen = {
   title: 'Untitled',
   code: { html: '', css: '', javascript: '' },
   libraries: [],
};

function penReducer(state, action) {
   switch (action.type) {
      case 'initialize':
         return action.payload;
      case 'html':
         return { ...state, code: { ...state.code, html: action.payload } };
      case 'css':
         return { ...state, code: { ...state.code, css: action.payload } };
      case 'javascript':
         return {
            ...state,
            code: { ...state.code, javascript: action.payload },
         };
      case 'remove-library':
         return {
            ...state,
            libraries: state.libraries.filter(
               library => library.name !== action.payload.name
            ),
         };
      case 'add-library':
         // add library if not duplicate
         let libraries = state.libraries;
         let addedLibrary = action.payload;
         if (!detectDuplicateObject(libraries, addedLibrary, 'name'))
            return {
               ...state,
               libraries: [...libraries, addedLibrary],
            };
         return state;
      case 'update-libraries':
         // get an updated libraries array and set it
         return {
            ...state,
            libraries: action.payload,
         };
      case 'title':
         return { ...state, title: action.payload };
      default:
         throw new Error('unexpected context type');
   }
}

export function PenProvider({ children }) {
   const [pen, dispatch] = useReducer(penReducer, {});

   return (
      <PenContext.Provider value={pen}>
         <PenContextDispatch.Provider value={dispatch}>
            {children}
         </PenContextDispatch.Provider>
      </PenContext.Provider>
   );
}

// actions
export function initialize(payload) {
   return { type: 'initialize', payload };
}

export function changeTitle(payload) {
   return { type: 'title', payload };
}

export function updateCode(lang, code) {
   return { type: lang, payload: code };
}
