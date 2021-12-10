import { Resizable } from '../../../ui';
import Output from '../components/Output';
import Console from '../../console/components/Console';
import { useViewLayout } from './ViewLayout.context';
import { useToggleConsole } from '../../console/contexts/ConsoleToggle-context';
import MobileEditors from '../components/MobileEditors';
import DesktopEditors from '../components/DesktopEditors';
import { useToggleOutput } from '../contexts/toggle-output-context';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

// This component layout editors and output window responsively
function ViewLayout() {
   const { isDesktop, isMobile } = useDeviceDetect();

   const { wrapper } = useViewLayout();

   const { isOpen: consoleOpen } = useToggleConsole();
   const outputOpen = useToggleOutput();

   return (
      <Resizable orientation={wrapper.orientation} minSize={200}>
         {/* Editors section */}
         {isDesktop && <DesktopEditors />}
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
