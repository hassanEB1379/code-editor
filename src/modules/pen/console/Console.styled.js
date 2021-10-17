import styled, { css } from 'styled-components';
import Flex from '../../../ui/Flex';

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
   overflow-y: auto;
   height: 100%;
   font-size: 0.9rem;
`;

const StyledConsoleMessage = styled.code`
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

const StyledCommandLine = styled.code`
   min-height: 2.2rem;
   line-height: 2.2rem;
   background-color: var(--command-line-bg);
   padding: 0 0.5rem 0 2rem;
   position: relative;
   &:focus {
      outline: none;
   }

   &::before {
      position: absolute;
      left: 0.5rem;
      top: 0;
      bottom: 0;
      content: '>';
      font-weight: 700;
      color: #5c5cff;
   }
`;

const ReturnedValue = styled.code`
   min-height: 1.5rem;
   line-height: 1.5rem;
   background-color: var(--command-line-return-bg);
   padding: 0 0.5rem 0 2rem;
   position: relative;
   font-size: 0.75rem;
   font-style: italic;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;

   &:focus {
      outline: none;
   }

   &::before {
      position: absolute;
      left: 0.5rem;
      top: 0;
      bottom: 0;
      content: '<';
      font-weight: 700;
   }
`;

export {
   ConsoleTitle,
   ConsoleBody,
   StyledConsoleMessage,
   StyledCommandLine,
   ReturnedValue,
};
