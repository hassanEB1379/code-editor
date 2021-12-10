import styled from 'styled-components';
import AceEditor from 'react-ace';
import {
   useUnsavedChangesCount,
   useUnsavedChangesDispatch,
} from '../contexts/unsaved-changes-context';
import { usePenDispatch } from '../contexts/pen-context';
import { useCustomAlert } from '../../alerts/useCustomAlert';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-twilight';

const EditorWrapper = styled.div.attrs(() => ({ className: 'flex dir-c' }))`
   height: 100%;

   &:not(:last-of-type) {
      border-bottom: 1px solid var(--dark-border);
   }
`;

const EditorHeader = styled.div.attrs(() => ({
   className: 'flex items-center',
}))`
   gap: 1rem;
   background-color: var(--dark-bg);
   padding: 0.5rem 1rem;

   & > h4 {
      color: var(--text-disabled);
   }
`;

const Editor = ({ iconSrc, ...rest }) => {
   const unsavedChanges = useUnsavedChangesCount();
   const PenDispatch = usePenDispatch();
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
      PenDispatch({ type: rest.mode, payload: code });
   }

   return (
      <EditorWrapper>
         <EditorHeader>
            <img alt="lang-icon" width={20} src={iconSrc} />
            <h4>{rest.mode.toUpperCase()}</h4>
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
