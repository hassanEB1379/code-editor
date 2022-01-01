/*
 *  This function send iframe messages ( errors , console messages ) to app with postMessage
 * */
let post = (type, msg = []) => {
   if (Array.isArray(msg)) {
      let postObject = {
         type: 'console-message',
         source: 'output-view-iframe',
         data: {
            type,
            array: msg,
         },
      };

      try {
         window.parent.postMessage(postObject, '*');
      } catch (err) {
         console.log(
            'Sorry , this log cannot be shown. using browser console instead'
         );
      }
   }
};

/*
 *   handle runtime iframe errors
 * */
window.onerror = message => {
   post([message], 'error');
};

const originalConsole = window.console;

const console = {
   warn: function (...message) {
      originalConsole.warn(...message);
      post('warning', ...message);
   },
   log: function (...message) {
      originalConsole.log(...message);
      post('log', ...message);
   },
   error: function (...message) {
      originalConsole.error(...message);
      post('error', ...message);
   },
   clear: function () {
      originalConsole.clear();
      post('clear');
   },
};

/*
 *  handle app console command line
 * */

function sendReturnedCommandValue(returnedValue) {
   const obj = JSON.parse(
      JSON.stringify({
         type: 'command-line-return-value',
         source: 'output-view-iframe',
         data:
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
