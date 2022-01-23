import { Resizable } from '../../../ui';
import Output from './Output';
import Console from '../console/Console';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { useState } from '@hookstate/core';
import { appearanceState, openConsoleState, openOutputState } from '../states';
import { EditorFactory } from '../apprearance/EditorFactory';

// This component layout editors and output window responsively
function ViewLayout() {
   const appearance = useState(appearanceState);
   const openConsole = useState(openConsoleState);
   const openOutput = useState(openOutputState);

   const { isDesktop, isMobile } = useDeviceDetect();

   return (
      <Resizable
         orientation={isDesktop ? 'horizontal' : 'vertical'}
         reverse={isDesktop && appearance.direction.get() === 'rtl'}
         minSize={200}
      >
         {isMobile && <EditorFactory manual="tab-mode" />}
         {isDesktop && <EditorFactory />}

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
