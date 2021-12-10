export const getGeneratedPageURL = ({
   html = '',
   css = '',
   javascript = '',
} = {}) => {
   const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
   };

   const cssURL = getBlobURL(css, 'text/css');
   const jsURL = getBlobURL(javascript, 'text/javascript');

   // create document of output iframe
   const source = `
    <html lang="en">
      <head>
        <title>Output pen</title>
        <meta charset="utf-8">      
        <script src='http://localhost:3000/static/libs/handle-iframe-console.js'></script>
        
        ${
           css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`
        }   
      </head>
      <body >
        ${html}
        ${javascript && `<script src="${jsURL}"></script>`} 
      </body>
    </html>
  `;

   return getBlobURL(source, 'text/html');
};
