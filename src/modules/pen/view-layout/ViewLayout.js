import { useEffect } from 'react';
import { Resizable } from '../../../ui';
import Output from '../components/Output';
import Console from '../console/Console';
import MobileEditors from '../components/MobileEditors';
import DesktopEditors from '../components/DesktopEditors';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { useState } from '@hookstate/core';
import { openConsoleState, openOutputState, viewLayoutState } from '../states';
import { verticalTemplate } from './ViewLayout-templates';

// This component layout editors and output window responsively
function ViewLayout() {
   const layout = useState(viewLayoutState);
   const openConsole = useState(openConsoleState);
   const openOutput = useState(openOutputState);

   const { isDesktop, isMobile } = useDeviceDetect();

   const divider = {
      [layout.wrapper.get().orientation === 'vertical'
         ? 'borderBottom'
         : 'borderRight']: 'var(--border)',
   };

   // vertical editor in mobile
   useEffect(() => {
      if (isMobile) layout.set(verticalTemplate);
   }, [isMobile]);

   return (
      <Resizable
         resizerStyle={{ backgroundColor: 'var(--primary-dark)' }}
         orientation={layout.wrapper.orientation.get()}
         minSize={200}
      >
         {isDesktop && <DesktopEditors style={divider} />}
         {isMobile && <MobileEditors />}

         {openOutput.get() && (
            <Resizable orientation="vertical">
               <Output />
               {openConsole.get() && <Console />}
            </Resizable>
         )}
      </Resizable>
   );
}

export default ViewLayout;
