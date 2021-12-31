export const getGeneratedPageURL = (
   { html = '', css = '', javascript = '' } = {},
   libraries = []
) => {
   const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
   };

   const cssURL = getBlobURL(css, 'text/css');
   const jsURL = getBlobURL(javascript, 'text/javascript');

   // convert library urls to script ( link ) tag then convert library array to string
   const renderedLibs = libraries
      .map(library => {
         let { fileType, latest } = library;

         if (fileType === 'js') {
            return `<script src="${latest}"></script>`;
         }
         if (fileType === 'css') {
            return `<link rel="stylesheet" href="${latest}"/>`;
         }
         return '';
      })
      .join(' ');

   // create document of output iframe
   const source = `
    <html lang="en">
      <head>
        <title>Output pen</title>
        <meta charset="utf-8"> 
        <script src="https://cdn.jsdelivr.net/gh/hassanEB1379/code-editor/scripts/handle-iframe-console.js"></script>
        
        ${renderedLibs}
        
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
