import { Fragment } from 'react';
import { SimpleButton, Spacing } from '../../../ui';
import { useToggleConsole } from '../contexts/ConsoleToggle-context';
import {
   useConsoleMessages,
   useConsoleMessagesDispatch,
} from '../contexts/ConsoleMessages-context';
import ConsoleMessage from './ConsoleMessage';
import CommandLine from './CommandLine';

import {
   ConsoleTitle,
   ConsoleBody,
   ConsoleHeader,
} from '../styled/styled-Console';

// icons
import { ClearIcon, CloseIcon } from '../../../ui/icons/icons';

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
         <ConsoleHeader>
            <ConsoleTitle>Console</ConsoleTitle>

            <Spacing className="flex inline gap-5" mr="1.5rem">
               <SimpleButton title="Clear" sm onClick={clearConsole}>
                  <ClearIcon size="lg" />
               </SimpleButton>

               <SimpleButton title="Close" sm onClick={toggle}>
                  <CloseIcon size="lg" />
               </SimpleButton>
            </Spacing>
         </ConsoleHeader>

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
