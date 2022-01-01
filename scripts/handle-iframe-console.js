/*
 *  This function create object that posted to app
 * */
let post = (msg, type) => {
   if (Array.isArray(msg)) {
      return {
         type: 'console-message',
         source: 'output-view-iframe',
         data: {
            type,
            array: msg,
         },
      };
   }
};

/*
 *   handle runtime iframe errors
 * */
window.onerror = message => {
   window.parent.postMessage(post([message], 'error'), '*');
};

function sendToAppConsole(type, ...messages) {
   try {
      window.parent.postMessage(post(messages, type), '*');
   } catch (err) {
      window.parent.postMessage(
         post(
            ['Sorry , this log cannot be shown. using browser console instead'],
            'log'
         ),
         '*'
      );
   }
}

const originalConsole = window.console;

const console = {
   warn: function (...message) {
      originalConsole.warn(...message);
      sendToAppConsole('warning', ...message);
   },
   log: function (...message) {
      originalConsole.log(...message);
      sendToAppConsole('log', ...message);
   },
   error: function (...message) {
      originalConsole.error(...message);
      sendToAppConsole('error', ...message);
   },
   clear: function () {
      originalConsole.clear();
      sendToAppConsole('clear');
   },
};

// handle command line

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
