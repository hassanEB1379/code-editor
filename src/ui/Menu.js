import styled from 'styled-components';

export const Menu = styled.ul`
   background-color: var(--menu-bg);
   color: var(--menu-text);
   min-width: 10rem;
   border-radius: 0.5rem;
   padding: 0.5rem 0;
   font-size: 0.9rem;
   box-shadow: 0 0 20px -5px #000;
`;

export const MenuItem = styled.li`
   padding: 0.5rem;
   cursor: pointer;

   &:hover {
      background-color: var(--menu-item-hover);
   }
`;
