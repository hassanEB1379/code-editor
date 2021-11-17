import { createContext, useContext, useState } from 'react';
import { AlertsView } from './AlertsView';

const showAlertDispatch = createContext(null);
export const useShowAlert = () => useContext(showAlertDispatch);

export function AlertsProvider({ children }) {
   const [alerts, setAlerts] = useState([]);

   function showAlert(variant, message, options = {}) {
      let id = Math.floor(Math.random() * 100000);
      // show alert
      let newAlert = { id, variant, message, options };
      setAlerts(prev => [...prev, newAlert]);
      // delete alert after delay
      let timeout = setTimeout(() => {
         setAlerts(prev => {
            return prev.filter(item => item.id !== id);
         });
         clearTimeout(timeout);
      }, 4000);
   }

   return (
      <showAlertDispatch.Provider value={showAlert}>
         <AlertsView alerts={alerts} setAlerts={setAlerts} />

         {children}
      </showAlertDispatch.Provider>
   );
}
