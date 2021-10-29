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

function sendToCustomConsole(type, message) {
   window.parent.postMessage(
      {
         type,
         source: 'output-view-iframe',
         payload: { message },
      },
      '*'
   );
}

const originalConsole = window.console;

const console = {
   warn: function (message) {
      originalConsole.warn(message);
      sendToCustomConsole('warning', message);
   },
   log: function (message) {
      originalConsole.log(message);
      sendToCustomConsole('log', message);
   },
   error: function (message) {
      originalConsole.error(message);
      sendToCustomConsole('error', message);
   },
   clear: function () {
      originalConsole.clear();
      sendToCustomConsole('clear');
   },
};

// handle command line

function sendReturnedCommandValue(returnedValue) {
   const obj = JSON.parse(
      JSON.stringify({
         type: 'command-line-return-value',
         payload:
            typeof returnedValue === 'function'
               ? returnedValue.toString()
               : returnedValue,
      })
   );

   window.parent.postMessage(obj, '*');
}

let totalCommandCode = '';
function runCommand(text) {
   // add semicolon to end of text if is not exist
   if (text.search(';') === -1) {
      text = text.concat(';');
   }

   try {
      let commandString;

      if (
         text.search('let') !== -1 ||
         text.search('const') !== -1 ||
         text.search('var') !== -1
      ) {
         commandString = totalCommandCode + text;
      } else {
         commandString = totalCommandCode + 'return ' + text;
      }

      sendReturnedCommandValue(Function(commandString)());

      if (text.search('console') === -1) {
         totalCommandCode += text;
      }
   } catch (err) {
      console.error(err.message);
   }
}
