import { ReturnedValue, StyledCommandLine } from '../styled/styled-Console';
import { Flex } from '../../../ui';
import { useCLReturnedValue } from '../contexts/CommandLine-context';

function CommandLine() {
   const commandReturnedValue = useCLReturnedValue();

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
