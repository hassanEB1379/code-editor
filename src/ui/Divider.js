import styled, { css } from 'styled-components';

export const Divider = styled.hr`
   ${({ orientation = 'horizontal' }) => {
      if (orientation === 'vertical') {
         return css`
            transform: rotate(180deg);
            width: 1px;
         `;
      }
      return css`
         width: 100%;
         height: 1px;
      `;
   }}

   border: none;
   margin: 0.3rem 0;
   background-color: var(--divider-bg);
`;
