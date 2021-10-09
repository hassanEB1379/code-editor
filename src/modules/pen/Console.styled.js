import styled, { css } from 'styled-components';
import Flex from '../../ui/Flex';

const ConsoleTitle = styled.p`
   background-color: var(--tab-bg);
   height: 100%;
   font-size: 0.9rem;
   font-weight: 600;
   color: var(--text-disabled);
   padding: 0.3rem 1rem 0.6rem;
   border-top: 0.3rem solid var(--tab-indicator);
`;

const ConsoleBody = styled(Flex).attrs(() => ({
   flexDir: 'column',
}))`
   background-color: var(--tab-bg);
   flex-grow: 1;
`;

const ConsoleLog = styled.p`
   ${({ logType }) => {
      switch (logType) {
         case 'error':
            return css`
               background-color: rgba(249, 4, 4, 0.55);
               border: 1px solid #ff0000;
            `;
         case 'warning':
            return css`
               background-color: rgba(255, 217, 53, 0.55);
               border: 1px solid #ffd000;
            `;
         default:
            return css`
               border: 1px solid #444444;
            `;
      }
   }};
   padding: 0.5rem 0.8rem;
`;

export { ConsoleTitle, ConsoleBody, ConsoleLog };
