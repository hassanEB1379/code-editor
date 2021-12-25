import Editor from './Editor';
import { Resizable } from '../../../ui';
import { useViewLayout } from '../view-layout/ViewLayout-context';
import { usePen } from '../contexts/pen-context';

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
   const { editors: layout } = useViewLayout();

   const { code } = usePen();

   return (
      <Resizable orientation={layout.orientation} minSize={38}>
         {editors.map(editorProps => (
            <Editor
               key={Math.random() * 10000}
               {...editorProps}
               value={code[editorProps.mode]}
            />
         ))}
      </Resizable>
   );
}

export default DesktopEditors;
