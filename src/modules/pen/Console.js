import Flex from '../../ui/Flex';
import Button from '../../ui/Button';
import { ConsoleTitle, ConsoleLog, ConsoleBody } from './Console.styled';
import { useToggleConsole } from './Console.context';
import { useConsoleLogs, useConsoleLogsDispatch } from './ConsoleLogs.context';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Console() {
   const dispatch = useConsoleLogsDispatch();

   const { toggle } = useToggleConsole();
   console.log('console');
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
            {logs.map((log, index) => {
               if (log.type === 'error') {
                  return (
                     <ConsoleLog logType="error" key={index}>
                        {log.payload.message}
                     </ConsoleLog>
                  );
               } else if (log.type === 'log') {
                  return (
                     <ConsoleLog key={index}>{log.payload.data}</ConsoleLog>
                  );
               } else if (log.type === 'warning') {
                  return (
                     <ConsoleLog logType="warning" key={index}>
                        {log.payload.message}
                     </ConsoleLog>
                  );
               }
            })}
         </ConsoleBody>
      </Flex>
   );
}

export default Console;
