import Flex from '../../../ui/Flex';
import Button from '../../../ui/Button';
import { useToggleConsole } from './ConsoleToggle.context';
import { useConsoleLogs, useConsoleLogsDispatch } from './ConsoleLogs.context';
import ConsoleMessage from './ConsoleMessage';

import { ConsoleTitle, ConsoleBody, CommandLine } from './Console.styled';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Console() {
   const dispatch = useConsoleLogsDispatch();

   const { toggle } = useToggleConsole();

   const logs = useConsoleLogs();

   function clearConsole() {
      dispatch({ type: 'clear' });
   }

   function executeRunCommand(e) {
      // execute run command function when click on Enter button
      if (e.keyCode === 13) {
         e.preventDefault();

         window.frames[0].frameElement.contentWindow.runCommand(
            e.target.innerText
         );
      }
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
            {logs.map((log, index) => {
               if (log.type === 'error') {
                  return (
                     <ConsoleMessage
                        type="error"
                        key={index}
                        data={log.payload.message}
                     />
                  );
               } else if (log.type === 'log') {
                  return <ConsoleMessage key={index} data={log.payload.data} />;
               } else if (log.type === 'warning') {
                  return (
                     <ConsoleMessage
                        type="warning"
                        key={index}
                        data={log.payload.message}
                     />
                  );
               }
            })}
         </ConsoleBody>

         <CommandLine
            id="console-command-line"
            spellCheck="false"
            contentEditable
            onKeyDown={executeRunCommand}
         />
      </Flex>
   );
}

export default Console;
