import { ReturnedValue, StyledCommandLine } from './Console.styled';
import { Flex } from '../../../ui';
import { useEffect, useState } from 'react';

function CommandLine() {
   const [commandReturnedValue, setCommandReturnedValue] = useState('');

   function executeRunCommand(e) {
      // execute run command function when click on Enter button
      if (e.keyCode === 13) {
         e.preventDefault();

         if (e.target.innerText) {
            window.frames[0].frameElement.contentWindow.runCommand(
               e.target.innerText
            );
         }

         e.target.innerText = '';
      }
   }

   useEffect(() => {
      function handleCommandReturnValue(e) {
         if (e.data.type === 'command-line-return-value') {
            setCommandReturnedValue(e.data.payload);
         }
      }

      window.addEventListener('message', handleCommandReturnValue);

      return () => {
         window.removeEventListener('message', handleCommandReturnValue);
      };
   }, []);

   return (
      <Flex flexDir="column">
         <StyledCommandLine
            id="console-command-line"
            spellCheck="false"
            contentEditable
            onKeyDown={executeRunCommand}
         />

         <ReturnedValue>
            {JSON.stringify(commandReturnedValue) || 'undefined'}
         </ReturnedValue>
      </Flex>
   );
}

export default CommandLine;
