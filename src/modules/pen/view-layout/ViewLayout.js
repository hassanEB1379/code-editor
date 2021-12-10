import { Resizable } from '../../../ui';
import Output from '../components/Output';
import Console from '../../console/components/Console';
import { useViewLayout } from './ViewLayout.context';
import { useToggleConsole } from '../../console/contexts/ConsoleToggle-context';
import { isBrowser, isMobile } from 'react-device-detect';
import MobileEditors from '../components/MobileEditors';
import DesktopEditors from '../components/DesktopEditors';
import { useToggleOutput } from '../contexts/toggle-output-context';

// This component layout editors and output window responsively
function ViewLayout() {
   const { wrapper } = useViewLayout();

   const { isOpen: consoleOpen } = useToggleConsole();
   const outputOpen = useToggleOutput();

   return (
      <Resizable orientation={wrapper.orientation} minSize={200}>
         {/* Editors section */}
         {isBrowser && <DesktopEditors />}
         {isMobile && <MobileEditors />}

         {/* Output section */}
         {outputOpen && (
            <Resizable orientation="vertical">
               <Output />
               {consoleOpen && <Console />}
            </Resizable>
         )}
      </Resizable>
   );
}

export default ViewLayout;
