import styled from 'styled-components';
import Flex from './Flex';
import { cloneElement, useEffect, useRef, useState } from 'react';

const DropdownWrapper = styled(Flex)`
   position: relative;
`;

const DropdownContent = styled.div`
   margin-top: 0.3rem;
   position: absolute;
   right: 0;
   top: 100%;
   z-index: var(--z-999);
   background-color: var(--dropdown-bg);
   border-radius: 0.5rem;
`;

function Dropdown({ children, action }) {
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
      <DropdownWrapper ref={nodeRef}>
         {cloneElement(action, { onClick: toggle })}
         <DropdownContent hidden={!open}>{children}</DropdownContent>
      </DropdownWrapper>
   );
}

export default Dropdown;
