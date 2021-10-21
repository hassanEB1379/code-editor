import { ToggleConsoleProvider } from '../console/ConsoleToggle.context';
import { ConsoleLogsProvider } from '../console/ConsoleLogs.context';
import { SourceCodeProvider } from '../contexts/source-code.context';
import { SourceUrlProvider } from '../contexts/source-url.context';
import { ViewLayoutProvider } from '../view-layout/ViewLayout.context';

function Providers({ children }) {
   return (
      <ViewLayoutProvider>
         <ToggleConsoleProvider>
            <ConsoleLogsProvider>
               <SourceCodeProvider>
                  <SourceUrlProvider>{children}</SourceUrlProvider>
               </SourceCodeProvider>
            </ConsoleLogsProvider>
         </ToggleConsoleProvider>
      </ViewLayoutProvider>
   );
}

export default Providers;
