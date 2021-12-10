import Editor from './Editor';
import { Resizable } from '../../../ui';
import { useViewLayout } from '../view-layout/ViewLayout.context';
import { usePen } from '../contexts/pen-context';

function DesktopEditors() {
   const { editors } = useViewLayout();

   const { code } = usePen();

   return (
      <Resizable orientation={editors.orientation} minSize={38}>
         <Editor
            mode="html"
            name="html-editor"
            value={code.html}
            iconSrc="/static/images/html.svg"
         />

         <Editor
            mode="css"
            name="css-editor"
            value={code.css}
            iconSrc="/static/images/css.svg"
         />

         <Editor
            mode="javascript"
            name="js-editor"
            value={code.javascript}
            iconSrc="/static/images/javascript.svg"
         />
      </Resizable>
   );
}

export default DesktopEditors;
