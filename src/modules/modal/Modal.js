import { useModal } from './ModalProvider';
import { ModalWindow } from './styled-modal';

function Modal() {
   const modalContent = useModal();

   return <ModalWindow show={modalContent}>{modalContent}</ModalWindow>;
}

export default Modal;
