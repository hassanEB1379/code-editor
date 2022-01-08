import styled, { css } from 'styled-components';

const ConsoleTitle = styled.p`
   height: 100%;
   font-size: 0.9rem;
   font-weight: 600;
   padding: 6px 1rem 6px 1rem;
   border-bottom: 3px solid var(--secondary);
`;

const ConsoleHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: var(--primary);
   border-top: var(--border);
`;

const ConsoleBody = styled.div.attrs(() => ({
   className: 'flex dir-c',
}))`
   flex-grow: 1;
   overflow-y: auto;
   height: 100%;
`;

const StyledConsoleMessage = styled.pre`
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
   display: flex;
   gap: 0.5rem;
   white-space: normal;
`;

const StyledCommandLine = styled.code`
   min-height: 2.2rem;
   line-height: 2.2rem;
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
      color: var(--secondary);
   }
`;

const ReturnedValue = styled.pre`
   min-height: 1.5rem;
   line-height: 1.5rem;
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
   ConsoleHeader,
};
