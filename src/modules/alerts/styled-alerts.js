import styled from 'styled-components';
import { Spacing } from '../../ui';

const StyledAlert = styled(Spacing).attrs(() => ({
   className: 'flex items-center justify-between gap-3',
   p: '.5rem .7rem',
   as: 'li', // render component as li tag
}))`
   --selected-color: ${({ variant }) =>
      variant === 'success'
         ? 'var(--success)'
         : variant === 'error'
         ? 'var(--error)'
         : variant === 'warning'
         ? 'var(--warning)'
         : 'var(--info)'};

   border: 3px solid var(--selected-color);
   background-color: var(--dark-btn);
   color: var(--contrast-text);
   border-radius: 0.3rem;
   font-size: 0.9rem;

   & > svg:last-of-type {
      cursor: pointer;
      fill: #8f8f8f;
      opacity: 0.8;
      &:hover {
         opacity: 1;
      }
   }
`;

const StyledAlertWithEffect = styled(StyledAlert)`
   transition: all 0.2s ease;

   opacity: ${({ state }) =>
      state === 'exiting' || state === 'exited' || state === 'entering'
         ? 0
         : 1};
   transform: translateY(
      ${({ state }) =>
         state === 'exiting' || state === 'exited' || state === 'entering'
            ? -50
            : 0}px
   );
`;

const AlertsContainer = styled.div`
   position: fixed;
   left: 50%;
   transform: translateX(-50%);
   width: 25rem;
   margin: 0.5rem;
   height: 0 !important;
   z-index: var(--z-alerts);
   & > ul {
      display: flex;
      flex-flow: wrap column;
      align-items: center;
      gap: 0.5rem;
   }
`;

export { AlertsContainer, StyledAlertWithEffect };
