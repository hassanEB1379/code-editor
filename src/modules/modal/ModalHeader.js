import { Button, Divider } from '../../ui';
import { useControlModal } from './ModalProvider';
import { CloseIcon } from '../../icons/icons';

function ModalHeader({ title, onModalClose }) {
   const { deleteModal } = useControlModal();

   function handleClose() {
      deleteModal();
      if (typeof onModalClose === 'function') onModalClose();
   }

   return (
      <>
         <div className="flex justify-between">
            <h2>{title}</h2>

            <Button sm onClick={handleClose}>
               <CloseIcon />
            </Button>
         </div>

         <Divider />
      </>
   );
}

export default ModalHeader;
