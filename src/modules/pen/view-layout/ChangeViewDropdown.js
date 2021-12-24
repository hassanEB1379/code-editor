import {
   horizontal,
   useViewLayout,
   useViewLayoutDispatch,
   vertical,
} from './ViewLayout-context';
import { Button, ButtonGroup, Dropdown, Spacing } from '../../../ui';
import ViewLayoutIcon from './ViewLayout-icon';

// This component change editors and output layout (vertical or horizontal).
// This features available on Desktop
export function ChangeViewDropdown() {
   const dispatch = useViewLayoutDispatch();

   const { icon } = useViewLayout();

   return (
      <Dropdown action={<Button>{icon}</Button>}>
         <Spacing className="flex dir-c gap-2" p=".5rem">
            <h4>Change view</h4>
            <ButtonGroup>
               <Button wide onClick={() => dispatch(horizontal())}>
                  <ViewLayoutIcon rotate={-90} />
               </Button>

               <Button wide onClick={() => dispatch(vertical())}>
                  <ViewLayoutIcon />
               </Button>
            </ButtonGroup>
         </Spacing>
      </Dropdown>
   );
}
