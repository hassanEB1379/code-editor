import { createContext, isValidElement, useContext, useState } from 'react';

const modal = createContext();
const controlModalDispatch = createContext();

// using this hooks for access context value
export const useModal = () => useContext(modal);
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
         <modal.Provider value={modalContent}>{children}</modal.Provider>
      </controlModalDispatch.Provider>
   );
}
