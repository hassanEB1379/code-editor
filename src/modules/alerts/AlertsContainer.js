import { StyledAlertsContainer } from './styled-alerts';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Alert } from './Alert';

function AlertsContainer({ alerts, setAlerts }) {
   function removeAlert(id) {
      setAlerts(prev => {
         return prev.filter(item => item.id !== id);
      });
   }

   return (
      <StyledAlertsContainer>
         <TransitionGroup component="ul">
            {alerts.map(alert => (
               <Transition key={alert.id} timeout={200}>
                  {state => (
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
      </StyledAlertsContainer>
   );
}

export default AlertsContainer;
