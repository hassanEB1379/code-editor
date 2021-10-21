import styled from 'styled-components';
import AceEditor from 'react-ace';
import Flex from '../../../ui/Flex';
import { useSourceCodeDispatch } from '../contexts/source-code.context';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-twilight';

const EditorWrapper = styled(Flex).attrs(() => ({ flexDir: 'column' }))`
   height: 100%;

   &:not(:last-of-type) {
      border-bottom: 1px solid var(--dark-border);
   }
`;

const EditorHeader = styled(Flex)`
   background-color: var(--dark-bg);
   padding: 0.5rem 1rem;

   & > h4 {
      color: var(--text-disabled);
   }
`;

const Editor = ({ iconSrc, type, ...rest }) => {
   const dispatch = useSourceCodeDispatch();

   function handleChangeSource(code) {
      dispatch({ type, payload: code });
   }

   return (
      <EditorWrapper>
         <EditorHeader gap="1rem" alignItems="center">
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
