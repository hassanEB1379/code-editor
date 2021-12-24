import { createContext, useContext, useReducer } from 'react';
import ViewLayoutIcon from './ViewLayout-icon';

const ViewLayoutContext = createContext();
const ViewLayoutContextDispatch = createContext();

export const useViewLayout = () => useContext(ViewLayoutContext);
export const useViewLayoutDispatch = () =>
   useContext(ViewLayoutContextDispatch);

const horizontalTemplate = {
   wrapper: {
      orientation: 'horizontal',
   },
   editors: {
      orientation: 'vertical',
   },
   icon: <ViewLayoutIcon rotate={-90} />,
};

const verticalTemplate = {
   wrapper: {
      orientation: 'vertical',
   },
   editors: {
      orientation: 'horizontal',
   },
   icon: <ViewLayoutIcon />,
};

function viewLayoutReducer(state, action) {
   let type = action.type;
   if (type === 'horizontal') return horizontalTemplate;
   if (type === 'vertical') return verticalTemplate;
}

export function ViewLayoutProvider({ children }) {
   const [layout, dispatch] = useReducer(viewLayoutReducer, horizontalTemplate);

   return (
      <ViewLayoutContext.Provider value={layout}>
         <ViewLayoutContextDispatch.Provider value={dispatch}>
            {children}
         </ViewLayoutContextDispatch.Provider>
      </ViewLayoutContext.Provider>
   );
}

// Actions
export function vertical() {
   return { type: 'vertical' };
}
export function horizontal() {
   return { type: 'horizontal' };
}
