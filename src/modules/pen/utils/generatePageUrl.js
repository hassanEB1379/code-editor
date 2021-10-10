export const getGeneratedPageURL = ({ html, css, js }) => {
   const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
   };

   const cssURL = getBlobURL(css, 'text/css');
   const jsURL = getBlobURL(js, 'text/javascript');

   // create document of output iframe and handle custom console in first script
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
