import { createContext, useContext, useEffect, useReducer } from 'react';
import { db } from '../../../indexedDB';

const PenContext = createContext();
const PenContextDispatch = createContext();

export const usePen = () => useContext(PenContext);
export const usePenDispatch = () => useContext(PenContextDispatch);

export const initialPen = {
   title: 'Untitled',
   image: '/static/images/pumpkin.webp',
   code: { html: '', css: '', js: '' },
};

function penReducer(state, action) {
   switch (action.type) {
      case 'initialize':
         return action.payload;
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

export function PenProvider({ children, id }) {
   const [pen, dispatch] = useReducer(penReducer, initialPen);

   // get initial state from indexedDB
   useEffect(() => {
      (async function () {
         const pen = await db.pens.get(Number(id));
         dispatch({ type: 'initialize', payload: pen });
      })();
   }, []);

   return (
      <PenContext.Provider value={pen}>
         <PenContextDispatch.Provider value={dispatch}>
            {children}
         </PenContextDispatch.Provider>
      </PenContext.Provider>
   );
}
