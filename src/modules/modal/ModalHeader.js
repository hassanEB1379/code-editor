import { Button, Divider } from '../../ui';
import { useControlModal } from './ModalProvider';
import { CloseIcon } from '../../icons/icons';

function ModalHeader({ title }) {
   const { deleteModal } = useControlModal();

   return (
      <>
         <div className="flex justify-between">
            <h2>{title}</h2>

            <Button sm onClick={deleteModal}>
               <CloseIcon />
            </Button>
         </div>

         <Divider />
      </>
   );
}

export default ModalHeader;
