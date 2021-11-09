import styled from 'styled-components';
import { useEffect } from 'react';
import { useConsoleMessagesDispatch } from '../console/ConsoleMessages-context';
import { useSourceUrl } from '../contexts/source-url.context';
import { useCLReturnedValueDispatch } from '../console/CommandLine-context';

const OutputWrapper = styled.div`
   flex-grow: 1;
   height: 100%;
   position: relative;
`;

const Output = () => {
   const consoleDispatch = useConsoleMessagesDispatch();
   const setCommandReturnedValue = useCLReturnedValueDispatch();

   // generated document url ( using in src attribute )
   const url = useSourceUrl();

   useEffect(() => {
      function handleIframeMessages({ data: messageData }) {
         if (messageData.source === 'output-view-iframe') {
            // The message was sent from our iframe

            if (messageData.type === 'console-message') {
               let type = messageData.data.type;
               // Send a new message to Context and display in the custom console
               consoleDispatch({ type, payload: messageData.data });
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
         <iframe
            style={{
               backgroundColor: '#fff',
               border: 'none',
            }}
            src={url}
            width="100%"
            height="100%"
            title="output-window"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
         />
      </OutputWrapper>
   );
};

export default Output;
