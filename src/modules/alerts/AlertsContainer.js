import { StyledAlertsContainer } from './styled-alerts';
import { createState, none, useState } from '@hookstate/core';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Alert } from './Alert';

export const alertsState = createState([]);

function AlertsContainer() {
   const alerts = useState(alertsState);

   const removeAlert = alert => alerts[alert].set(none);

   return (
      <StyledAlertsContainer>
         <TransitionGroup component="ul">
            {alerts.map((alert, index) => (
               <Transition key={index} timeout={200}>
                  {state => (
                     <Alert
                        variant={alert.variant.get()}
                        state={state}
                        icon={alert.options.icon.get()}
                        removeHandler={() => removeAlert(alert)}
                     >
                        {alert.message.get()}
                     </Alert>
                  )}
               </Transition>
            ))}
         </TransitionGroup>
      </StyledAlertsContainer>
   );
}

export default AlertsContainer;
