import { StyledConsoleMessage } from '../styled/styled-Console';
import { StyleByDataType } from './StyleByDataType';

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
