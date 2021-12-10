import { useViewLayout, useViewLayoutDispatch } from './ViewLayout.context';
import { Button, ButtonGroup, Dropdown, Spacing } from '../../../ui';
import ViewLayoutIcon from './ViewLayout.icon';

// This component change editors and output layout (vertical or horizontal).
// This feature available on Desktop
export function ChangeViewDropdown() {
   const dispatch = useViewLayoutDispatch();

   const { icon } = useViewLayout();

   function changeLayout(type) {
      dispatch({ type });
   }

   return (
      <Dropdown action={<Button>{icon}</Button>}>
         <Spacing className="flex dir-c gap-2" p=".5rem">
            <h4>Change view</h4>
            <ButtonGroup>
               <Button wide onClick={() => changeLayout('default')}>
                  <ViewLayoutIcon rotate={-90} />
               </Button>

               <Button wide onClick={() => changeLayout('vertical')}>
                  <ViewLayoutIcon />
               </Button>
            </ButtonGroup>
         </Spacing>
      </Dropdown>
   );
}
