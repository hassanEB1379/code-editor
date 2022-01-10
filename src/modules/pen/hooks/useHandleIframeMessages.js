import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { cmdReturnedValueState, consoleMessagesState } from '../states';

// this hook get messages from iframe and set relative context
export function useHandleIframeMessages() {
   const consoleMessage = useState(consoleMessagesState);
   const cmdReturnedValue = useState(cmdReturnedValueState);

   useEffect(() => {
      function handleIframeMessages(e) {
         // get postMessage data properties
         let { source, type, data } = e.data;

         if (source === 'output-view-iframe') {
            // The message was sent from our iframe

            if (type === 'console-message') {
               // type of console message. "log" , "warning", "error" and ...
               let messageType = data.type;
               // Send a new message to Context and display in the custom console
               consoleMessage.merge([data]);
            } else if (type === 'command-line-return-value') {
               cmdReturnedValue.set(data);
            }
         }
      }

      window.addEventListener('message', handleIframeMessages);
      return () => {
         window.removeEventListener('message', handleIframeMessages);
      };
   }, [consoleMessage, cmdReturnedValue]);
}
