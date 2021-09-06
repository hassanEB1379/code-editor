import styled from 'styled-components';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-twilight';

const EditorWrapper = styled.div`
   &:not(:last-of-type) {
      border-bottom: 1px solid var(--dark-border);
   }
`;

const Editor = props => {
   return (
      <EditorWrapper>
         <AceEditor
            theme="twilight"
            fontSize="1.2rem"
            width="100%"
            height="200px"
            {...props}
         />
      </EditorWrapper>
   );
};

export default Editor;
