import { Fragment } from 'react';
import { Button, Flex } from '../../../ui';
import { useToggleConsole } from '../contexts/ConsoleToggle-context';
import {
   useConsoleMessages,
   useConsoleMessagesDispatch,
} from '../contexts/ConsoleMessages-context';
import ConsoleMessage from './ConsoleMessage';
import CommandLine from './CommandLine';

import { ConsoleTitle, ConsoleBody } from '../styled/styled-Console';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Console() {
   const dispatch = useConsoleMessagesDispatch();
   const messages = useConsoleMessages();

   const { toggle } = useToggleConsole();

   function clearConsole() {
      dispatch({ type: 'clear' });
   }

   return (
      <Flex style={{ height: '100%' }} flexDir="column">
         {/* Console header */}
         <Flex justify="space-between" items="center">
            <ConsoleTitle>Console</ConsoleTitle>

            <Flex inline gap=".3rem" mr=".5rem">
               <Button sm onClick={clearConsole}>
                  Clear
               </Button>

               <Button sm onClick={toggle}>
                  <FontAwesomeIcon icon={faTimes} />
               </Button>
            </Flex>
         </Flex>

         <ConsoleBody>
            {messages.map((message, index) => (
               <Fragment key={index}>
                  {message.type === 'error' && (
                     <ConsoleMessage
                        type="error"
                        key={index}
                        dataArray={message.array}
                     />
                  )}

                  {message.type === 'warning' && (
                     <ConsoleMessage
                        type="warning"
                        key={index}
                        dataArray={message.array}
                     />
                  )}

                  {message.type === 'log' && (
                     <ConsoleMessage key={index} dataArray={message.array} />
                  )}
               </Fragment>
            ))}
         </ConsoleBody>

         <CommandLine />
      </Flex>
   );
}

export default Console;
