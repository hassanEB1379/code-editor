import { Fragment } from 'react';
import { Button, Spacing } from '../../../ui';
import { useToggleConsole } from '../contexts/ConsoleToggle-context';
import {
   useConsoleMessages,
   useConsoleMessagesDispatch,
} from '../contexts/ConsoleMessages-context';
import ConsoleMessage from './ConsoleMessage';
import CommandLine from './CommandLine';

import { ConsoleTitle, ConsoleBody } from '../styled/styled-Console';

// icons
import { CloseIcon } from '../../../ui/icons/icons';

function Console() {
   const dispatch = useConsoleMessagesDispatch();
   const messages = useConsoleMessages();

   const { toggle } = useToggleConsole();

   function clearConsole() {
      dispatch({ type: 'clear' });
   }

   return (
      <div className="flex dir-c">
         {/* Console header */}
         <div className="flex items-center justify-between">
            <ConsoleTitle>Console</ConsoleTitle>

            <Spacing className="flex inline gap-1" mr=".5rem">
               <Button sm onClick={clearConsole}>
                  Clear
               </Button>

               <Button sm onClick={toggle}>
                  <CloseIcon />
               </Button>
            </Spacing>
         </div>

         <ConsoleBody>
            {messages.map((message, index) => (
               <Fragment key={index}>
                  {message.type === 'error' && (
                     <ConsoleMessage type="error" dataArray={message.array} />
                  )}

                  {message.type === 'warning' && (
                     <ConsoleMessage type="warning" dataArray={message.array} />
                  )}

                  {message.type === 'log' && (
                     <ConsoleMessage dataArray={message.array} />
                  )}
               </Fragment>
            ))}
            <CommandLine />
         </ConsoleBody>
      </div>
   );
}

export default Console;
