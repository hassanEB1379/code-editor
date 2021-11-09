import { Resizable } from '../../../ui';
import Editor from '../components/Editor';
import Output from '../components/Output';
import Console from '../console/Console';
import { useViewLayout } from './ViewLayout.context';
import { useToggleConsole } from '../console/ConsoleToggle.context';
import { usePen } from '../contexts/pen-context';

function ViewLayout() {
   const { wrapper, editors } = useViewLayout();

   const { isOpen } = useToggleConsole();

   const { code } = usePen();

   return (
      <Resizable orientation={wrapper.orientation} minSize={200}>
         <Resizable orientation={editors.orientation} minSize={38}>
            <Editor
               mode="html"
               name="html-editor"
               type="html"
               defaultValue={code.html}
               iconSrc="/static/images/html-5.svg"
            />

            <Editor
               mode="css"
               name="css-editor"
               type="css"
               defaultValue={code.css}
               iconSrc="/static/images/css-3.svg"
            />

            <Editor
               mode="javascript"
               name="js-editor"
               type="js"
               defaultValue={code.js}
               iconSrc="/static/images/javascript.svg"
            />
         </Resizable>

         <Resizable orientation="vertical">
            <Output />
            {isOpen && <Console />}
         </Resizable>
      </Resizable>
   );
}

export default ViewLayout;
