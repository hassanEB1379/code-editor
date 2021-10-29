import { createContext, useContext, useReducer } from 'react';

const PenContext = createContext();
const PenContextDispatch = createContext();

export const usePen = () => useContext(PenContext);
export const usePenDispatch = () => useContext(PenContextDispatch);

const initialPen = { title: 'Untitled', code: { html: '', css: '', js: '' } };

function initializer(initialState) {
   let state;

   try {
      state = JSON.parse(localStorage.getItem('pen')) || initialState;
   } catch (err) {
      console.log(err);
   }

   return state;
}

function penReducer(state, action) {
   switch (action.type) {
      case 'html':
         return { ...state, code: { ...state.code, html: action.payload } };
      case 'css':
         return { ...state, code: { ...state.code, css: action.payload } };
      case 'js':
         return { ...state, code: { ...state.code, js: action.payload } };
      case 'name':
         return { ...state, title: action.payload };
      default:
         throw new Error('unexpected context type');
   }
}

export function PenProvider({ children }) {
   const [pen, dispatch] = useReducer(penReducer, initialPen, initializer);

   return (
      <PenContext.Provider value={pen}>
         <PenContextDispatch.Provider value={dispatch}>
            {children}
         </PenContextDispatch.Provider>
      </PenContext.Provider>
   );
}
