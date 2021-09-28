import Pen from './modules/pen/Pen';

// context providers
import { ToggleConsoleProvider } from './modules/pen/Console.context';
import { ViewLayoutProvider } from './modules/pen/ViewLayout.context';

function App() {
   return (
      <ViewLayoutProvider>
         <ToggleConsoleProvider>
            <Pen />
         </ToggleConsoleProvider>
      </ViewLayoutProvider>
   );
}

export default App;
