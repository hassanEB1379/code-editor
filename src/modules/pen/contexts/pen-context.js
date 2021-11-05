import { createContext, useContext, useReducer } from 'react';

const PenContext = createContext();
const PenContextDispatch = createContext();

export const usePen = () => useContext(PenContext);
export const usePenDispatch = () => useContext(PenContextDispatch);

const initialPen = {
   title: 'Untitled',
   image: 'https://cdn.pixabay.com/photo/2021/10/18/08/39/pumpkin-6720424_960_720.jpg',
   code: { html: '', css: '', js: '' },
};

function initializer(initialState, id) {
   let state;

   try {
      let pens = JSON.parse(localStorage.getItem('pens'));
      let pen = pens.find(pen => pen.id.toString() === id);

      if (pen) {
         state = pen;
      }
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

export function PenProvider({ children, id }) {
   const [pen, dispatch] = useReducer(penReducer, initialPen, initialState =>
      initializer(initialState, id)
   );

   return (
      <PenContext.Provider value={pen}>
         <PenContextDispatch.Provider value={dispatch}>
            {children}
         </PenContextDispatch.Provider>
      </PenContext.Provider>
   );
}
