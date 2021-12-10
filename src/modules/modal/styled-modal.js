import styled from 'styled-components';
import { Spacing } from '../../ui';

export const ModalWindow = styled(Spacing).attrs(() => ({
   className: 'flex justify-center items-center',
   p: '1rem',
}))`
   position: fixed;
   inset: 0;
   z-index: var(--z-999);
   background-color: var(--dark-bg-transparent);
`;

export const ModalContent = styled.div.attrs(() => ({
   className: 'flex dir-c',
}))`
   gap: 0.5rem;
   background-color: var(--paper);
   border: 3px solid var(--paper-border);
   border-radius: 0.3rem;
   width: 100%;
   max-width: 50rem;
   padding: 0.75rem;
`;
