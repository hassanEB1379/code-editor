import styled from 'styled-components';
import { useEffect } from 'react';
import { useConsoleLogsDispatch } from '../console/ConsoleLogs.context';
import { useSourceUrl } from '../contexts/source-url.context';

const OutputWrapper = styled.div`
   flex-grow: 1;
   height: 100%;
   position: relative;
`;

const OutputView = () => {
   const dispatch = useConsoleLogsDispatch();

   const url = useSourceUrl();

   useEffect(() => {
      function handleIframeError(e) {
         if (e.data.source === 'output-view-iframe') {
            dispatch({ type: e.data.type, payload: e.data });
         }
      }

      window.addEventListener('message', handleIframeError);

      return () => {
         window.removeEventListener('message', handleIframeError);
      };
   }, [dispatch]);

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

export default OutputView;
