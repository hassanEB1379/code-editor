import { ToggleConsoleProvider } from './modules/pen/console/ConsoleToggle.context';
import { ConsoleLogsProvider } from './modules/pen/console/ConsoleLogs.context';
import { PenProvider } from './modules/pen/contexts/pen-context';
import { SourceUrlProvider } from './modules/pen/contexts/source-url.context';
import { ViewLayoutProvider } from './modules/pen/view-layout/ViewLayout.context';
import { AuthDataProvider } from './modules/authentication/contexts/auth-context';

function Providers({ children }) {
   return (
      <AuthDataProvider>
         <ViewLayoutProvider>
            <ToggleConsoleProvider>
               <ConsoleLogsProvider>
                  <PenProvider>
                     <SourceUrlProvider>{children}</SourceUrlProvider>
                  </PenProvider>
               </ConsoleLogsProvider>
            </ToggleConsoleProvider>
         </ViewLayoutProvider>
      </AuthDataProvider>
   );
}

export default Providers;
