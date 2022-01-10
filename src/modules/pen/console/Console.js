import styled from 'styled-components';
import { Fragment } from 'react';
import { SimpleButton, Spacing } from '../../../ui';
import ConsoleMessage from './ConsoleMessage';
import CommandLine from './CommandLine';
import { useState } from '@hookstate/core';
import { consoleMessagesState, openConsoleState } from '../states';

// icons
import { ClearIcon, CloseIcon } from '../../../ui/icons/icons';

const ConsoleTitle = styled.p`
   height: 100%;
   font-size: 0.9rem;
   font-weight: 600;
   padding: 6px 1rem 6px 1rem;
   border-bottom: 3px solid var(--secondary);
`;

const ConsoleHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: var(--primary);
   border-top: var(--border);
`;

const ConsoleBody = styled.div.attrs(() => ({
   className: 'flex dir-c',
}))`
   flex-grow: 1;
   overflow-y: auto;
   height: 100%;
`;

function Console() {
   const openConsole = useState(openConsoleState);
   const consoleMessages = useState(consoleMessagesState);

   const closeConsole = () => openConsole.set(false);
   const clearConsole = () => consoleMessages.set([]);

   return (
      <div className="flex dir-c">
         {/* Console header */}
         <ConsoleHeader>
            <ConsoleTitle>Console</ConsoleTitle>

            <Spacing className="flex inline gap-5" mr="1.5rem">
               <SimpleButton title="Clear" sm onClick={clearConsole}>
                  <ClearIcon size="lg" />
               </SimpleButton>

               <SimpleButton title="Close" sm onClick={closeConsole}>
                  <CloseIcon size="lg" />
               </SimpleButton>
            </Spacing>
         </ConsoleHeader>

         <ConsoleBody>
            {consoleMessages.map((message, index) => (
               <Fragment key={index}>
                  {message.type.get() === 'error' && (
                     <ConsoleMessage
                        type="error"
                        dataArray={message.array.get()}
                     />
                  )}

                  {message.type.get() === 'warning' && (
                     <ConsoleMessage
                        type="warning"
                        dataArray={message.array.get()}
                     />
                  )}

                  {message.type.get() === 'log' && (
                     <ConsoleMessage dataArray={message.array.get()} />
                  )}
               </Fragment>
            ))}
            <CommandLine />
         </ConsoleBody>
      </div>
   );
}

export default Console;
