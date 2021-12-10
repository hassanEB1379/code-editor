import { Button, ButtonGroup, Divider, Spacing } from '../../../ui';
import { useState } from 'react';
import Editor from './Editor';
import { usePen } from '../contexts/pen-context';
import { useToggleOutputDispatch } from '../contexts/toggle-output-context';

function MobileEditors() {
   const [activeEditor, setActiveEditor] = useState('html');

   const setOpenOutput = useToggleOutputDispatch();

   const { code } = usePen();

   function toggleResult() {
      setOpenOutput(prev => !prev);
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
            iconSrc={`/static/images/${activeEditor}.svg`}
         />
      </div>
   );
}

export default MobileEditors;
