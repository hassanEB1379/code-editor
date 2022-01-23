import { useState } from '@hookstate/core';
import { appearanceState } from '../states';
import { TabModeEditors } from './TabModeEditors';
import { WindowModeEditors } from './WindowModeEditors';

// this component return editor based on appearance setting
export function EditorFactory({ manual }) {
   const appearance = useState(appearanceState);

   if (appearance.editorMode.get() === 'tab-mode' || manual === 'tab-mode') {
      return <TabModeEditors />;
   }

   if (
      appearance.editorMode.get() === 'window-mode' ||
      manual === 'window-mode'
   ) {
      return <WindowModeEditors />;
   }
}
