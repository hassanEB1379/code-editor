import { Divider, SimpleButton, Text } from '../../ui';
import { useControlModal } from './ModalProvider';
import { CloseIcon } from '../../ui/icons/icons';

function ModalHeader({ title, onModalClose }) {
   const { deleteModal } = useControlModal();

   function handleClose() {
      deleteModal();
      if (typeof onModalClose === 'function') onModalClose();
   }

   return (
      <>
         <div className="flex justify-between">
            <Text as="h2" size="2rem">
               {title}
            </Text>

            <SimpleButton sm onClick={handleClose}>
               <CloseIcon size="lg" />
            </SimpleButton>
         </div>

         <Divider />
      </>
   );
}

export default ModalHeader;
