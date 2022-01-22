import styled from 'styled-components';
import AceEditor from 'react-ace';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import { useState } from '@hookstate/core';
import { penState, unsavedChangesState } from '../states';

const EditorWrapper = styled.div`
   flex-grow: 1;
   display: flex;
   flex-direction: column;
`;

const StyledAceEditor = styled(AceEditor).attrs(() => ({
   width: '100%',
   height: '100%',
   fontSize: '1.1rem',
}))`
   letter-spacing: 1px;
   line-height: 1.5;
   background-color: var(--primary-dark);
`;

const Editor = ({ options }) => {
   const unsavedChanges = useState(unsavedChangesState);
   const pen = useState(penState);

   const { showWarningAlert } = useCustomAlert();

   function handleChangeSource(code) {
      // increment unsaved changes
      unsavedChanges.set(p => p + 1);
      // show warning alert for saving
      if (unsavedChanges.get() % 50 === 0 && unsavedChanges.get() !== 0) {
         showWarningAlert(`There is ${unsavedChanges.get()} unsaved changes`);
      }
      // update pen context with new code
      pen.code.merge({ [options.mode]: code });
   }

   return (
      <EditorWrapper>
         <StyledAceEditor
            onChange={handleChangeSource}
            theme="twilight"
            {...options}
         />
      </EditorWrapper>
   );
};

export default Editor;
