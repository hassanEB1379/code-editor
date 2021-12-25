import { Button, ButtonGroup, Divider, Spacing } from '../../../ui';
import { useState } from 'react';
import Editor from './Editor';
import { usePen } from '../contexts/pen-context';
import { useToggleOutputDispatch } from '../contexts/toggle-output-context';

// icons
import htmlIcon from '../../../ui/images/html.svg';
import cssIcon from '../../../ui/images/css.svg';
import jsIcon from '../../../ui/images/javascript.svg';

function MobileEditors() {
   const [activeEditor, setActiveEditor] = useState('html');

   const setOpenOutput = useToggleOutputDispatch();

   const { code } = usePen();

   function toggleResult() {
      setOpenOutput(prev => !prev);
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
               <Button onClick={() => setActiveEditor('html')}>HTML</Button>
               <Button onClick={() => setActiveEditor('css')}>CSS</Button>
               <Button onClick={() => setActiveEditor('javascript')}>JS</Button>
               <Button onClick={toggleResult}>Result</Button>
            </ButtonGroup>
         </Spacing>

         <Divider />

         {/*  Selected Editor */}
         <Editor
            mode={activeEditor}
            name={activeEditor + 'editor'}
            value={code[activeEditor]}
            icon={getIcon(activeEditor)}
         />
      </div>
   );
}

export default MobileEditors;
