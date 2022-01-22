import { Resizable } from '../../../ui';
import Output from '../components/Output';
import Console from '../console/Console';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { useState } from '@hookstate/core';
import { openConsoleState, openOutputState } from '../states';
import { EditorFactory } from '../apprearance/EditorFactory';

// This component layout editors and output window responsively
function ViewLayout() {
   const openConsole = useState(openConsoleState);
   const openOutput = useState(openOutputState);

   const { isDesktop, isMobile } = useDeviceDetect();

   return (
      <Resizable
         orientation={isDesktop ? 'horizontal' : 'vertical'}
         minSize={200}
      >
         {isDesktop && <EditorFactory />}
         {isMobile && <EditorFactory manual="tab-mode" />}

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
