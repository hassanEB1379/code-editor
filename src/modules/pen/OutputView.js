import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useDebounceEffect from '../../useDebouncEffect';
import { useConsoleLogsDispatch } from './console/ConsoleLogs.context';
import { useSourceCode } from './source-code.context';
import { getGeneratedPageURL } from './utils/generatePageUrl';

const OutputWrapper = styled.div`
   flex-grow: 1;
   height: 100%;
   position: relative;
`;

const OutputOverlay = styled.div`
   position: absolute;
   inset: 0;
   z-index: 10;
`;

const OutputView = () => {
   const source = useSourceCode();

   const dispatch = useConsoleLogsDispatch();

   const [sourceUrl, setSourceUrl] = useState('');

   useDebounceEffect(
      () => {
         setSourceUrl(getGeneratedPageURL(source));
      },
      1000,
      [source]
   );

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
         <OutputOverlay />

         <iframe
            style={{ backgroundColor: '#fff', border: 'none' }}
            src={sourceUrl}
            width="100%"
            height="100%"
            title="output-window"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            scrolling="auto"
         />
      </OutputWrapper>
   );
};

export default OutputView;
