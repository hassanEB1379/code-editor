import { Box, Resizable } from '../../../ui';
import Editor from '../components/Editor';
import { useState } from '@hookstate/core';
import { penState } from '../states';
import styled from 'styled-components';

// icons
import htmlIcon from '../../../ui/images/html.svg';
import cssIcon from '../../../ui/images/css.svg';
import jsIcon from '../../../ui/images/javascript.svg';

const EditorHeader = styled.div`
   height: 2rem;
   display: flex;
   align-items: center;
   gap: 1.1rem;
   background-color: var(--primary);
   padding: 0 1rem;
`;

const editors = [
   { mode: 'html', name: 'html-editor', icon: htmlIcon },
   { mode: 'css', name: 'css-editor', icon: cssIcon },
   {
      mode: 'javascript',
      name: 'js-editor',
      icon: jsIcon,
   },
];

export function WindowModeEditors() {
   const pen = useState(penState);

   return (
      <Resizable orientation="vertical" minSize={38}>
         {editors.map((editorProps, index) => (
            <Box className="flex dir-c" key={index}>
               <EditorHeader>
                  <img
                     width="18px"
                     alt={editorProps.name + '-icon'}
                     src={editorProps.icon}
                  />
                  {editorProps.mode}
               </EditorHeader>
               <Editor
                  options={{
                     ...editorProps,
                     value: pen.code.get()[editorProps.mode],
                  }}
               />
            </Box>
         ))}
      </Resizable>
   );
}
