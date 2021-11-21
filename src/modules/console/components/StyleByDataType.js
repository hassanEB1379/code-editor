import { FormattedObject } from './FormattedObject';
import { StyledNumber, StyledString } from '../styled/styled-StyleByDataType';

export function StyleByDataType({ data }) {
   let dataType = typeof data;
   let isArray = Array.isArray(data);

   if (dataType === 'string') {
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
