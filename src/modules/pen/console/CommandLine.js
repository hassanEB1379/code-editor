import styled from 'styled-components';
import { useState } from '@hookstate/core';
import { cmdReturnedValueState } from '../states';

const StyledCommandLine = styled.code`
   min-height: 2.2rem;
   line-height: 2.2rem;
   padding: 0 0.5rem 0 2rem;
   position: relative;
   &:focus {
      outline: none;
   }

   &::before {
      position: absolute;
      left: 0.5rem;
      top: 0;
      bottom: 0;
      content: '>';
      font-weight: 700;
      color: var(--secondary);
   }
`;

const ReturnedValue = styled.pre`
   min-height: 1.5rem;
   line-height: 1.5rem;
   padding: 0 0.5rem 0 2rem;
   position: relative;
   font-size: 0.75rem;
   font-style: italic;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;

   &:focus {
      outline: none;
   }

   &::before {
      position: absolute;
      left: 0.5rem;
      top: 0;
      bottom: 0;
      content: '<';
      font-weight: 700;
   }
`;

function CommandLine() {
   const cmdReturnedValue = useState(cmdReturnedValueState);

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
      <div className="flex dir-c">
         <StyledCommandLine
            id="console-command-line"
            spellCheck="false"
            contentEditable
            onKeyDown={executeRunCommand}
         />

         {cmdReturnedValue.get() && (
            <ReturnedValue>
               {JSON.stringify(cmdReturnedValue.get()) || 'undefined'}
            </ReturnedValue>
         )}
      </div>
   );
}

export default CommandLine;
