import { FormattedObject } from './FormattedObject';
import StyledDOMElement from './StyledDOMElement';
import styled from 'styled-components';

const StyledNumber = styled.code`
   color: var(--console-number);
`;
const StyledString = styled.code`
   color: var(--console-str);
`;

export function StyleByDataType({ data }) {
   let dataType = typeof data;
   let isArray = Array.isArray(data);

   if (dataType === 'string') {
      if (data.slice(-10) === '_QEwF5vjI1') {
         // this is a dom element
         return <StyledDOMElement element={data.slice(0, -10)} />;
      }
      return <StyledString>{`'${data}'`}</StyledString>;
   }

   if (dataType === 'object') {
      return <FormattedObject object={data} array={isArray} />;
   }

   if (
      dataType === 'number' ||
      dataType === 'boolean' ||
      dataType === 'undefined'
   ) {
      return <StyledNumber>{String(data)}</StyledNumber>;
   }

   return null;
}
