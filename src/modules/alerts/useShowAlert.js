import { none, useState } from '@hookstate/core';
import { alertsState } from './AlertsContainer';

export function useShowAlert() {
   const alerts = useState(alertsState);

   return function (variant, message, options = {}) {
      let id = Math.floor(Math.random() * 100000);
      // show alert
      let newAlert = { id, variant, message, options };
      alerts.merge([newAlert]);
      // delete alert after delay
      let timeout = setTimeout(() => {
         alerts[newAlert].set(none);
         clearTimeout(timeout);
      }, 4000);
   };
}
