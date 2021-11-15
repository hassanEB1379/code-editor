import { AlertsContainer, StyledAlertWithEffect } from './styled-alerts';
import { Transition, TransitionGroup } from 'react-transition-group';

export function Alert({ state, removeHandler, variant, icon, children }) {
   return (
      <StyledAlertWithEffect state={state} variant={variant}>
         {icon}
         {children}
         <svg onClick={removeHandler} viewBox="0 0 352 512" width="10">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
         </svg>
      </StyledAlertWithEffect>
   );
}

export function AlertsView({ alerts, setAlerts }) {
   function removeAlert(id) {
      setAlerts(prev => {
         return prev.filter(item => item.id !== id);
      });
   }

   return (
      <AlertsContainer>
         {/* render list with transition */}
         <TransitionGroup component="ul">
            {alerts.map(alert => (
               <Transition key={alert.id} timeout={200}>
                  {state => (
                     // state change: exited -> entering -> entered -> exiting -> exited
                     <Alert
                        variant={alert.variant}
                        state={state}
                        icon={alert.options.icon}
                        removeHandler={() => removeAlert(alert.id)}
                     >
                        {alert.message}
                     </Alert>
                  )}
               </Transition>
            ))}
         </TransitionGroup>
      </AlertsContainer>
   );
}
