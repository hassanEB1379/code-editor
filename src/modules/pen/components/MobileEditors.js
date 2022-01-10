import { Button, ButtonGroup, Divider, Spacing } from '../../../ui';
import Editor from './Editor';
import { openOutputState, penState } from '../states';
import { useState } from '@hookstate/core';

// icons
import htmlIcon from '../../../ui/images/html.svg';
import cssIcon from '../../../ui/images/css.svg';
import jsIcon from '../../../ui/images/javascript.svg';

function MobileEditors() {
   const pen = useState(penState);
   const openOutput = useState(openOutputState);

   const activeEditor = useState('html');

   function toggleResult() {
      openOutput.set(prev => !prev);
   }

   function getIcon(activeEditor) {
      if (activeEditor === 'html') return htmlIcon;
      if (activeEditor === 'css') return cssIcon;
      if (activeEditor === 'javascript') return jsIcon;
   }

   return (
      <div className="flex dir-c">
         <Spacing className="flex items-center justify-between" p=".5rem">
            {/* Select editor buttons */}
            <ButtonGroup>
               <Button onClick={() => activeEditor.set('html')}>HTML</Button>
               <Button onClick={() => activeEditor.set('css')}>CSS</Button>
               <Button onClick={() => activeEditor.set('javascript')}>
                  JS
               </Button>
               <Button onClick={toggleResult}>Result</Button>
            </ButtonGroup>
         </Spacing>

         <Divider />

         {/*  Selected Editor */}
         <Editor
            mode={activeEditor.get()}
            name={activeEditor.get() + 'editor'}
            value={pen.code.get()[activeEditor]}
            icon={getIcon(activeEditor.get())}
         />
      </div>
   );
}

export default MobileEditors;
