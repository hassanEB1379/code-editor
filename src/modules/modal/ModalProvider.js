import { createContext, isValidElement, useContext, useState } from 'react';
import { ModalWindow } from './styled-modal';

const controlModalDispatch = createContext(null);

// using this hook for access context value
export const useControlModal = () => useContext(controlModalDispatch);

// This component provide modal container and context for hold modal content
export function ModalProvider({ children }) {
   const [modalContent, setModalContent] = useState(null);

   function showModal(component) {
      if (isValidElement(component)) setModalContent(component);
   }
   function deleteModal() {
      setModalContent(null);
   }

   return (
      <controlModalDispatch.Provider value={{ deleteModal, showModal }}>
         {/* Show modal if there is content */}
         {modalContent && <ModalWindow>{modalContent}</ModalWindow>}

         {/* other content */}
         {children}
      </controlModalDispatch.Provider>
   );
}
