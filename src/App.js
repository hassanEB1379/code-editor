import Pen from './modules/pen/Pen';

// context providers
import { ToggleConsoleProvider } from './modules/pen/console/ConsoleToggle.context';
import { ViewLayoutProvider } from './modules/pen/view-layout/ViewLayout.context';
import { ConsoleLogsProvider } from './modules/pen/console/ConsoleLogs.context';
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
