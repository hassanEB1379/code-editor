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

function DesktopEditors(props) {
   const { editors: layout } = useViewLayout();

   const { code } = usePen();

   return (
      <Resizable
         {...props}
         resizerStyle={{
            borderTop: 'var(--border)',
            backgroundColor: 'var(--primary)',
         }}
         orientation={layout.orientation}
         minSize={38}
      >
         {editors.map((editorProps, index) => (
            <Editor
               {...editorProps}
               key={index}
               defaultValue={code[editorProps.mode]}
            />
         ))}
      </Resizable>
   );
}

export default DesktopEditors;
