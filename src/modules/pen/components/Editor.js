import styled from 'styled-components';
import { Text } from '../../../ui';
import AceEditor from 'react-ace';
import { updateCode, usePenDispatch } from '../contexts/pen-context';
import { useCustomAlert } from '../../alerts/useCustomAlert';
import {
   useUnsavedChangesCount,
   useUnsavedChangesDispatch,
} from '../contexts/unsaved-changes-context';

const EditorWrapper = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   &:not(:last-of-type) {
      border-bottom: 1px solid var(--dark-border);
   }
`;

const EditorHeader = styled.div`
   display: flex;
   align-items: center;
   gap: 1rem;
   background-color: var(--dark-bg);
   padding: 0.5rem 1rem;
`;

const Editor = ({ icon, ...rest }) => {
   const unsavedChanges = useUnsavedChangesCount();
   const penDispatch = usePenDispatch();
   const unsavedChangesDispatch = useUnsavedChangesDispatch();
   const { showWarningAlert } = useCustomAlert();

   function handleChangeSource(code) {
      // increment unsaved changes
      unsavedChangesDispatch(prev => prev + 1);
      // show warning alert for saving
      if (unsavedChanges % 50 === 0 && unsavedChanges !== 0) {
         showWarningAlert(`There is ${unsavedChanges} unsaved changes`);
      }
      // update pen context with new code
      penDispatch(updateCode(rest.mode, code));
   }

   return (
      <EditorWrapper>
         <EditorHeader>
            <img alt="lang-icon" width={20} src={icon} />
            <Text textTransform="uppercase" as="h4">
               {rest.mode === 'javascript' ? 'js' : rest.mode}
            </Text>
         </EditorHeader>

         <AceEditor
            onChange={handleChangeSource}
            theme="twilight"
            fontSize="1rem"
            width="100%"
            height="100%"
            {...rest}
         />
      </EditorWrapper>
   );
};

export default Editor;
