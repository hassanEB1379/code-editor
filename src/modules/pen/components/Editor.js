import styled from 'styled-components';
import { Text } from '../../../ui';
import AceEditor from 'react-ace';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import { useState } from '@hookstate/core';
import { penState, unsavedChangesState } from '../states';

const EditorWrapper = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
`;

const EditorHeader = styled.div`
   display: flex;
   align-items: center;
   gap: 1.5rem;
   background-color: var(--primary);
   padding: 0.5rem 1rem;
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

const Editor = ({ icon, ...rest }) => {
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
      pen.code.merge({ [rest.mode]: code });
   }

   return (
      <EditorWrapper>
         <EditorHeader>
            <img alt="lang-icon" width={17} src={icon} />
            <Text textTransform="uppercase" as="h4">
               {rest.mode === 'javascript' ? 'js' : rest.mode}
            </Text>
         </EditorHeader>

         <StyledAceEditor
            onChange={handleChangeSource}
            theme="twilight"
            {...rest}
         />
      </EditorWrapper>
   );
};

export default Editor;
