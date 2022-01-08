import styled from 'styled-components';
import { Spacing } from '../../ui';

export const ModalWindow = styled(Spacing).attrs(() => ({
   className: 'flex justify-center items-center',
   p: '1rem',
}))`
   position: fixed;
   inset: 0;
   z-index: var(--z-999);
   background-color: var(--primary-dark-transparent);
   // show modal if there is content
   display: ${({ show }) => !show && 'none'};
`;

export const ModalContent = styled.div`
   display: flex;
   flex-direction: column;
   font-size: 1.2rem;
   gap: 0.5rem;
   background-color: var(--primary-dark);
   border: 3px solid var(--primary);
   border-radius: 0.3rem;
   width: 100%;
   max-width: 65rem;
   min-height: 85%;
   padding: 0.75rem;
`;

export const ModalBody = styled.div`
   flex-grow: 1;
   padding: 0.5rem 0;
`;
