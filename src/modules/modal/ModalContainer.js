import { ModalWindow } from './styled-modal';
import { useModal } from './ModalProvider';

export function ModalContainer() {
   const modal = useModal();
   return <ModalWindow show={modal}>{modal}</ModalWindow>;
}
