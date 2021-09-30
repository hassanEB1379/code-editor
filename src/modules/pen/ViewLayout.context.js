import { createContext, useContext, useReducer } from 'react';
import ViewLayoutIcon from './ViewLayout.icon';

const ViewLayoutContext = createContext();
const ViewLayoutContextDispatch = createContext();

export const useViewLayout = () => useContext(ViewLayoutContext);
export const useViewLayoutDispatch = () =>
   useContext(ViewLayoutContextDispatch);

const initialLayout = {
   wrapper: {
      orientation: 'horizontal',
   },
   editors: {
      orientation: 'vertical',
   },
   icon: <ViewLayoutIcon rotate={-90} />,
};

function viewLayoutReducer(state, action) {
   switch (action.type) {
      case 'default':
         return initialLayout;
      case 'reverse':
         return initialLayout;
      case 'vertical':
         return {
            wrapper: {
               orientation: 'vertical',
            },
            editors: {
               orientation: 'horizontal',
            },
            icon: <ViewLayoutIcon />,
         };

      default:
         throw new Error('unexpected type');
   }
}

export function ViewLayoutProvider({ children }) {
   const [layout, dispatch] = useReducer(viewLayoutReducer, initialLayout);

   return (
      <ViewLayoutContext.Provider value={layout}>
         <ViewLayoutContextDispatch.Provider value={dispatch}>
            {children}
         </ViewLayoutContextDispatch.Provider>
      </ViewLayoutContext.Provider>
   );
}
