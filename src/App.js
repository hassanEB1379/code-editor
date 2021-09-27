import Pen from './Pen';

// context providers
import { ToggleConsoleProvider } from './context/Console.context';

function App() {
   return (
      <ToggleConsoleProvider>
         <Pen />
      </ToggleConsoleProvider>
   );
}

export default App;
