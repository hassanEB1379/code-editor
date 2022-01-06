// in the app, dom elements are identified with this key
const domKey = '_QEwF5vjI1';

const originalConsole = window.console;

/*
 *   handle runtime iframe errors
 * */
window.onerror = message => {
   sendToAppConsole('error', [message]);
};

/*
 *  This function send iframe error and console messages to app console
 * */
function sendToAppConsole(type, messages = []) {
   if (Array.isArray(messages)) {
      let postObject = {
         type: 'console-message',
         source: 'output-view-iframe',
         data: {
            type,
            array: createValidObject(messages),
         },
      };

      try {
         window.parent.postMessage(postObject, '*');
      } catch (err) {
         sendToAppConsole('log', [
            'Sorry , this log cannot be shown. using browser console instead',
         ]);
      }
   }
}

/*
 *  This function create a cloneable array based on structured clone algorithm:
 *  1 - convert dom element to string
 *  2 - convert window and document object to string
 *  3 - convert functions to string
 * */
function createValidObject(obj) {
   let cloned = Array.isArray(obj) ? [] : {};

   for (const key in obj) {
      let value = obj[key];

      if (typeof value === 'object') {
         if (isDOM(value)) {
            cloned[key] = value.outerHTML.concat(domKey);
         } else if (isWindow(value) || isDocument(value)) {
            cloned[key] = value.toString();
         } else {
            cloned[key] = createValidObject(value);
         }
      } else if (typeof value === 'function') {
         cloned[key] = value.toString();
      } else {
         cloned[key] = value;
      }
   }

   return cloned;
}

const console = {
   warn: function (...messages) {
      originalConsole.warn(...messages); // show in browser console
      sendToAppConsole('warning', messages); // show in app console
   },
   log: function (...messages) {
      originalConsole.log(...messages);
      sendToAppConsole('log', messages);
   },
   error: function (...messages) {
      originalConsole.error(...messages);
      sendToAppConsole('error', messages);
   },
   clear: function () {
      originalConsole.clear();
      sendToAppConsole('clear');
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

/*
 *  helper functions
 * */

function isDOM(element) {
   return element instanceof HTMLElement;
}

function isWindow(object) {
   return object instanceof Window;
}

function isDocument(object) {
   return object instanceof Document;
}
