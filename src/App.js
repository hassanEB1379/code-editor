import Pen from './modules/pen/Pen';

// context providers
import { ToggleConsoleProvider } from './modules/pen/Console.context';
import { ViewLayoutProvider } from './modules/pen/ViewLayout.context';
import { ConsoleLogsProvider } from './modules/pen/ConsoleLogs.context';
import { SourceCodeProvider } from './modules/pen/source-code.context';

function App() {
   return (
      <ViewLayoutProvider>
         <ToggleConsoleProvider>
            <ConsoleLogsProvider>
               <SourceCodeProvider>
                  <Pen />
               </SourceCodeProvider>
            </ConsoleLogsProvider>
         </ToggleConsoleProvider>
      </ViewLayoutProvider>
   );
}

export default App;
