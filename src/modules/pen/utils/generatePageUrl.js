export const getGeneratedPageURL = ({ html = '', css = '', js = '' } = {}) => {
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
        <script src='http://localhost:3000/static/libs/handle-iframe-console.js'></script>
        
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}    
      </head>
      <body >
        ${html}
      </body>
    </html>
  `;

   return getBlobURL(source, 'text/html');
};
