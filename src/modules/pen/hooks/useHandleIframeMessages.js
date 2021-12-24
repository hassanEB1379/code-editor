import {
   pushMessage,
   useConsoleMessagesDispatch,
} from '../../console/contexts/ConsoleMessages-context';
import { useCLReturnedValueDispatch } from '../../console/contexts/CommandLine-context';
import { useEffect } from 'react';

// this hook get messages from iframe and set relative context
export function useHandleIframeMessages() {
   const consoleDispatch = useConsoleMessagesDispatch();
   const setCommandReturnedValue = useCLReturnedValueDispatch();

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
               consoleDispatch(pushMessage(messageType, data));
            } else if (type === 'command-line-return-value') {
               setCommandReturnedValue(data);
            }
         }
      }

      window.addEventListener('message', handleIframeMessages);
      return () => {
         window.removeEventListener('message', handleIframeMessages);
      };
   }, [consoleDispatch, setCommandReturnedValue]);
}
