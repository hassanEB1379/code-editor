import { Resizable } from '../../../ui';
import Editor from '../components/Editor';
import { useState } from '@hookstate/core';
import { penState } from '../states';

// icons
import htmlIcon from '../../../ui/images/html.svg';
import cssIcon from '../../../ui/images/css.svg';
import jsIcon from '../../../ui/images/javascript.svg';

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
            <Editor
               key={index}
               options={{
                  ...editorProps,
                  value: pen.code.get()[editorProps.mode],
               }}
            />
         ))}
      </Resizable>
   );
}
