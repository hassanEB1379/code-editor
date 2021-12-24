import Editor from './Editor';
import { Resizable } from '../../../ui';
import { useViewLayout } from '../view-layout/ViewLayout-context';
import { usePen } from '../contexts/pen-context';

const editors = [
   { mode: 'html', name: 'html-editor', iconSrc: '/static/images/html.svg' },
   { mode: 'css', name: 'css-editor', iconSrc: '/static/images/css.svg' },
   {
      mode: 'javascript',
      name: 'js-editor',
      iconSrc: '/static/images/javascript.svg',
   },
];

function DesktopEditors() {
   const { editors: layout } = useViewLayout();

   const { code } = usePen();

   return (
      <Resizable orientation={layout.orientation} minSize={38}>
         {editors.map(editorProps => (
            <Editor {...editorProps} value={code[editorProps.mode]} />
         ))}
      </Resizable>
   );
}

export default DesktopEditors;
