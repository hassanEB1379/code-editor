import { FormattedObject } from './FormattedObject';
import { StyledNumber, StyledString } from '../styled/styled-StyleByDataType';
import StyledDOMElement from './StyledDOMElement';

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
