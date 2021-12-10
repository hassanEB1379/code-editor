import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Menu = styled.ul`
   background-color: var(--menu-bg);
   color: var(--menu-text);
   min-width: 10rem;
   border-radius: 0.5rem;
   padding: 0.5rem 0;
   font-size: 0.9rem;
   box-shadow: 0 0 20px -5px #000;
`;

const StyledMenuItem = styled.li`
   display: inline-block;
   width: 100%;
   padding: 0.5rem;
   cursor: pointer;

   &:hover {
      background-color: var(--menu-item-hover);
   }
`;

export function MenuItem({ as, icon, children, ...rest }) {
   return (
      <StyledMenuItem as={as} {...rest}>
         {icon && (
            <FontAwesomeIcon style={{ marginRight: '.75rem' }} icon={icon} />
         )}
         {children}
      </StyledMenuItem>
   );
}
