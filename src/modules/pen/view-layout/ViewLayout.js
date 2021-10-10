import Resizable from '../../../ui/Resizable/Resizable';
import Editor from '../Editor';
import OutputView from '../OutputView';
import Console from '../console/Console';
import { useViewLayout } from './ViewLayout.context';
import { useToggleConsole } from '../console/ConsoleToggle.context';

function ViewLayout() {
   const { wrapper, editors } = useViewLayout();

   const { isOpen } = useToggleConsole();

   return (
      <Resizable orientation={wrapper.orientation} minSize={38}>
         <Resizable orientation={editors.orientation} minSize={38}>
            <Editor
               mode="html"
               name="html-editor"
               type="html"
               iconSrc="static/images/html-5.svg"
            />

            <Editor
               mode="css"
               name="css-editor"
               type="css"
               iconSrc="static/images/css-3.svg"
            />

            <Editor
               mode="javascript"
               name="js-editor"
               type="js"
               iconSrc="static/images/javascript.svg"
            />
         </Resizable>

         <Resizable orientation="vertical">
            <OutputView />
            {isOpen && <Console />}
         </Resizable>
      </Resizable>
   );
}

export default ViewLayout;
