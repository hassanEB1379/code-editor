import { Box, Button, Divider, Dropdown } from '../../../ui';
import { AppearanceIcon } from '../../../ui/icons/icons';
import { useState } from '@hookstate/core';
import { appearanceState } from '../states';
import { ChangeFontSize } from './ChangeFontSize';

export function AppearanceMenu() {
   const appearance = useState(appearanceState);

   return (
      <Dropdown
         action={
            <Button title="appearance">
               <AppearanceIcon size="lg" />
            </Button>
         }
      >
         <Box w="18rem" className="flex dir-c" p=".5rem">
            <Box className="flex inline justify-between">
               <label>Direction</label>
               <select
                  name="direction"
                  id="direction"
                  value={appearance.direction.get()}
                  onChange={e => appearanceState.direction.set(e.target.value)}
               >
                  <option value="ltr">ltr</option>
                  <option value="rtl">rtl</option>
               </select>
            </Box>
            <Divider />
            <Box className="flex inline justify-between">
               <label>Editor layout</label>
               <select
                  name="editor-layout"
                  id="editor-layout"
                  value={appearance.editorMode.get()}
                  onChange={e => appearanceState.editorMode.set(e.target.value)}
               >
                  <option value="tab-mode">Tab</option>
                  <option value="window-mode">Window</option>
               </select>
            </Box>
            <Divider />
            <Box className="flex inline justify-between">
               <ChangeFontSize size={appearance.fontSize} />
            </Box>
         </Box>
      </Dropdown>
   );
}
