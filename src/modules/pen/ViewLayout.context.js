import { createContext, useContext, useReducer } from 'react';
import Icon from '../../ui/Icon';

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
   icon: <Icon alt="layout-icon" src="static/images/layout.svg" rotate={-90} />,
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
            icon: <Icon alt="layout-icon" src="static/images/layout.svg" />,
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
