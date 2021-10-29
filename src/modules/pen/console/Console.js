import { Button, Flex } from '../../../ui';
import { useToggleConsole } from './ConsoleToggle.context';
import { useConsoleLogs, useConsoleLogsDispatch } from './ConsoleLogs.context';
import ConsoleMessage from './ConsoleMessage';
import CommandLine from './CommandLine';

import { ConsoleTitle, ConsoleBody } from './Console.styled';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';

function Console() {
   const dispatch = useConsoleLogsDispatch();

   const { toggle } = useToggleConsole();

   const logs = useConsoleLogs();

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
            {logs.map((log, index) => (
               <Fragment key={index}>
                  {log.type === 'error' && (
                     <ConsoleMessage
                        type="error"
                        key={index}
                        data={log.payload.message}
                     />
                  )}

                  {log.type === 'warning' && (
                     <ConsoleMessage
                        type="warning"
                        key={index}
                        data={log.payload.message}
                     />
                  )}

                  {log.type === 'log' && (
                     <ConsoleMessage key={index} data={log.payload.message} />
                  )}
               </Fragment>
            ))}
         </ConsoleBody>

         <CommandLine />
      </Flex>
   );
}

export default Console;
