import { createContext, useContext, useReducer } from 'react';

const PenContext = createContext();
const PenContextDispatch = createContext();

export const usePen = () => useContext(PenContext);
export const usePenDispatch = () => useContext(PenContextDispatch);

export const initialPen = {
   title: 'Untitled',
   image: '/static/images/pumpkin.webp',
   code: { html: '', css: '', javascript: '' },
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
      case 'name':
         return { ...state, title: action.payload };
      default:
         throw new Error('unexpected context type');
   }
}

export function PenProvider({ children }) {
   const [pen, dispatch] = useReducer(penReducer, initialPen);

   return (
      <PenContext.Provider value={pen}>
         <PenContextDispatch.Provider value={dispatch}>
            {children}
         </PenContextDispatch.Provider>
      </PenContext.Provider>
   );
}
