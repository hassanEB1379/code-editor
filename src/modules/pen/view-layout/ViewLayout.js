import { useEffect } from 'react';
import { Resizable } from '../../../ui';
import Output from '../components/Output';
import Console from '../../console/components/Console';
import { useToggleConsole } from '../../console/contexts/ConsoleToggle-context';
import MobileEditors from '../components/MobileEditors';
import DesktopEditors from '../components/DesktopEditors';
import { useToggleOutput } from '../contexts/toggle-output-context';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import {
   useViewLayout,
   useViewLayoutDispatch,
   vertical,
} from './ViewLayout-context';

// This component layout editors and output window responsively
function ViewLayout() {
   const { isDesktop, isMobile } = useDeviceDetect();

   const { wrapper } = useViewLayout();
   const dispatch = useViewLayoutDispatch();

   const { isOpen: consoleOpen } = useToggleConsole();
   const outputOpen = useToggleOutput();

   const divider = {
      [wrapper.orientation === 'vertical' ? 'borderBottom' : 'borderRight']:
         'var(--border)',
   };

   // vertical editor in mobile
   useEffect(() => {
      if (isMobile) dispatch(vertical());
   }, [isMobile, dispatch]);

   return (
      <Resizable
         resizerStyle={{ backgroundColor: 'var(--primary-dark)' }}
         orientation={wrapper.orientation}
         minSize={200}
      >
         {isDesktop && <DesktopEditors style={divider} />}
         {isMobile && <MobileEditors />}

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
