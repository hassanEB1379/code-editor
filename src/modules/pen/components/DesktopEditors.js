import { useState } from '@hookstate/core';
import { penState, viewLayoutState } from '../states';
import Editor from './Editor';
import { Resizable } from '../../../ui';

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

function DesktopEditors() {
   const layout = useState(viewLayoutState);
   const pen = useState(penState);

   return (
      <Resizable orientation={layout.editors.orientation.get()} minSize={38}>
         {editors.map((editorProps, index) => (
            <Editor
               {...editorProps}
               key={index}
               defaultValue={pen.code.get()[editorProps.mode]}
            />
         ))}
      </Resizable>
   );
}

export default DesktopEditors;
