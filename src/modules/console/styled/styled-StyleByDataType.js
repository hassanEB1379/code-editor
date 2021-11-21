// console message style by type
import styled from 'styled-components';

const StyledNumber = styled.code`
   color: var(--console-number);
`;
const StyledString = styled.code`
   color: var(--console-str);
`;

// FO === FormattedObject
const FOExpandButton = styled.span`
   width: 0.5rem;
   cursor: pointer;
`;

const FOItemCount = styled.p`
   display: inline-block;
   opacity: 0.4;
   font-size: 0.9rem;
`;

const FOItemsList = styled.ul`
   margin-left: 1.2rem;
   margin-top: 0.5rem;
   & > li:not(:last-of-type) {
      margin-bottom: 0.3rem;
   }
`;

export { StyledNumber, StyledString, FOItemCount, FOItemsList, FOExpandButton };
