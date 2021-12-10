import styled, { css } from 'styled-components';
import { cloneElement, useEffect, useRef, useState } from 'react';

const DropdownWrapper = styled.div`
   position: relative;
`;

const DropdownContent = styled.div`
   --space: 0.3rem;

   position: absolute;
   z-index: var(--z-999);
   background-color: var(--dropdown-bg);
   border-radius: 0.5rem;

   ${({ openFrom }) => {
      switch (openFrom) {
         case 'top':
            return css`
               bottom: 100%;
               right: 0;
               margin-bottom: var(--space);
            `;
         case 'left':
            return css`
               right: 100%;
               bottom: 0;
               margin-right: var(--space);
            `;
         case 'right':
            return css`
               left: 100%;
               bottom: 0;
               margin-left: var(--space);
            `;
         default:
            return css`
               top: 100%;
               right: 0;
               margin-top: var(--space);
            `;
      }
   }}
`;

export function Dropdown({ children, action, openFrom, className }) {
   const nodeRef = useRef();

   const [open, setOpen] = useState(false);

   function toggle() {
      setOpen(prev => !prev);
   }

   function close(e) {
      if (nodeRef.current && !nodeRef.current?.contains(e.target)) {
         setOpen(false);
      }
   }

   useEffect(() => {
      window.addEventListener('click', close, true);

      return () => {
         window.removeEventListener('click', close, true);
      };
   }, []);

   return (
      <DropdownWrapper className={`flex ${className}`} ref={nodeRef}>
         {cloneElement(action, { onClick: toggle })}
         <DropdownContent openFrom={openFrom} hidden={!open}>
            {children}
         </DropdownContent>
      </DropdownWrapper>
   );
}
