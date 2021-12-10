import styled from 'styled-components';
import { useEffect } from 'react';
import { useConsoleMessagesDispatch } from '../../console/contexts/ConsoleMessages-context';
import { useSourceUrl } from '../contexts/source-url.context';
import { useCLReturnedValueDispatch } from '../../console/contexts/CommandLine-context';

const OutputWrapper = styled.div`
   flex-grow: 1;
   height: 100%;
   position: relative;
`;

const Iframe = styled.iframe`
   background-color: white;
   border: none;
   width: 100%;
   height: 100%;
`;

const Output = () => {
   const consoleDispatch = useConsoleMessagesDispatch();
   const setCommandReturnedValue = useCLReturnedValueDispatch();

   // generated document url ( using in src attribute )
   const url = useSourceUrl();

   // This effect get messages from output iframe
   useEffect(() => {
      function handleIframeMessages(e) {
         // get postMessage data property
         let messageData = e.data;

         if (messageData.source === 'output-view-iframe') {
            // The message was sent from our iframe

            if (messageData.type === 'console-message') {
               // type of console message. "log" , "warning", "error" and ...
               let messageType = messageData.data.type;
               // Send a new message to Context and display in the custom console
               consoleDispatch({
                  type: messageType,
                  payload: messageData.data,
               });
            } else if (messageData.type === 'command-line-return-value') {
               setCommandReturnedValue(messageData.data);
            }
         }
      }

      window.addEventListener('message', handleIframeMessages);
      return () => {
         window.removeEventListener('message', handleIframeMessages);
      };
   }, [consoleDispatch, setCommandReturnedValue]);

   return (
      <OutputWrapper>
         <Iframe
            src={url}
            title="output-window"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
         />
      </OutputWrapper>
   );
};

export default Output;
