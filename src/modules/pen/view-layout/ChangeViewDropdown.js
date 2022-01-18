import { Button, ButtonGroup, Dropdown, Spacing } from '../../../ui';
import ViewLayoutIcon from './ViewLayout-icon';
import { useState } from '@hookstate/core';
import { viewLayoutState } from '../states';
import { horizontalTemplate, verticalTemplate } from './ViewLayout-templates';

// This component change editors and output layout (vertical or horizontal).
// This features available on Desktop
export function ChangeViewDropdown() {
   const layout = useState(viewLayoutState);

   return (
      <Dropdown
         action={
            <Button>
               <ViewLayoutIcon {...layout.iconProps.get()} />
            </Button>
         }
      >
         <Spacing className="flex dir-c gap-2" p=".5rem">
            <h4>Change view</h4>
            <ButtonGroup>
               <Button wide onClick={() => layout.set(horizontalTemplate)}>
                  <ViewLayoutIcon rotate={-90} />
               </Button>

               <Button wide onClick={() => layout.set(verticalTemplate)}>
                  <ViewLayoutIcon />
               </Button>
            </ButtonGroup>
         </Spacing>
      </Dropdown>
   );
}
