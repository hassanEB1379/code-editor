import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useDebounceEffect from '../../useDebouncEffect';
import { useConsoleLogsDispatch } from './ConsoleLogs.context';

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

const getGeneratedPageURL = ({ html, css, js }) => {
   const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
   };

   const cssURL = getBlobURL(css, 'text/css');
   const jsURL = getBlobURL(js, 'text/javascript');

   const source = `
    <html lang="en">
      <head>
        <title>Output pen</title>
        <meta charset="utf-8">
         
        <script >
          window.onerror = (message, source, lineno, colno, error) => {
            window.parent.postMessage(
              {
                type : 'error',
                source : 'output-view-iframe',
                payload : {message ,source ,lineno ,colno ,error} 
              },
              '*'   
            )
          }
          
          const customConsole = {
            warn : (message) => {
              window.parent.postMessage({
                type : 'warning',
                source : 'output-view-iframe',
                payload : { message }
              } , '*')
            },
            log : (data) => {
              window.parent.postMessage({
                type : 'log',
                source : 'output-view-iframe',
                payload : { data }
              } , '*')
            },
            error : (message) => {
              window.parent.postMessage({
                type : 'error',
                source : 'output-view-iframe',
                payload : { message }
              } , '*')
            },
            clear : () => {
               window.parent.postMessage({
                type : 'clear',
                source : 'output-view-iframe',
              } , '*')
            }
          }
          
          window.console = {...window.console ,...customConsole }
        </script>
      
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
        
        
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `;

   return getBlobURL(source, 'text/html');
};

const OutputView = ({ code }) => {
   const dispatch = useConsoleLogsDispatch();

   const [src, setSrc] = useState('');

   useDebounceEffect(
      () => {
         setSrc(getGeneratedPageURL(code));
      },
      1000,
      [code]
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
            src={src}
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
