import { StyledConsoleMessage } from './Console.styled';

function ConsoleMessage({ data, type }) {
   let formattedData;

   if (typeof data === 'object') {
      formattedData = JSON.stringify(data);
   } else {
      formattedData = String(data);
   }

   return (
      <StyledConsoleMessage logType={type}>
         {formattedData}
      </StyledConsoleMessage>
   );
}

export default ConsoleMessage;
