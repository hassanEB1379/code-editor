window.onerror = (message, source, lineno, colno, error) => {
   window.parent.postMessage(
      {
         type: 'error',
         source: 'output-view-iframe',
         payload: { message, source, lineno, colno, error },
      },
      '*'
   );
};

const customConsole = {
   warn: message => {
      window.parent.postMessage(
         {
            type: 'warning',
            source: 'output-view-iframe',
            payload: { message },
         },
         '*'
      );
   },
   log: data => {
      window.parent.postMessage(
         {
            type: 'log',
            source: 'output-view-iframe',
            payload: { data },
         },
         '*'
      );
   },
   error: message => {
      window.parent.postMessage(
         {
            type: 'error',
            source: 'output-view-iframe',
            payload: { message },
         },
         '*'
      );
   },
   clear: () => {
      window.parent.postMessage(
         {
            type: 'clear',
            source: 'output-view-iframe',
         },
         '*'
      );
   },
};

window.console = { ...window.console, ...customConsole };

// handle command line

let totalCommandCode = '';
function runCommand(text) {
   // add semicolon to end of text if is not exist
   let textWithSemicolon = text;
   if (text.search(';') === -1) {
      textWithSemicolon = text.concat(';');
   }

   try {
      let returnedValue = Function(
         totalCommandCode + 'return ' + textWithSemicolon
      )();

      const obj = JSON.parse(
         JSON.stringify({
            type: 'command-line-return-value',
            payload: returnedValue,
         })
      );
      window.parent.postMessage(obj, '*');

      totalCommandCode += textWithSemicolon;
   } catch (err) {
      console.error(err.message);
      // remove wrong code
      totalCommandCode = totalCommandCode.replace(text, '');
   }
}
