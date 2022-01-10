import { StyleByDataType } from './StyleByDataType';
import styled, { css } from 'styled-components';

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

function ConsoleMessage({ dataArray, type }) {
   return (
      <StyledConsoleMessage logType={type}>
         {dataArray.map((data, index) => (
            <StyleByDataType key={index} data={data} />
         ))}
      </StyledConsoleMessage>
   );
}

export default ConsoleMessage;
