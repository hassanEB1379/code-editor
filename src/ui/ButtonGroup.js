import styled from 'styled-components';
import { Spacing } from './Spacing';

const ButtonGroupWrapper = styled(Spacing).attrs(() => ({
   className: 'flex',
}))`
   & > * {
      border-radius: 0;
      margin: 0 0.8px;
   }
   & > *:last-child {
      border-radius: 0 0.3rem 0.3rem 0;
   }
   & > *:first-child {
      border-radius: 0.3rem 0 0 0.3rem;
   }
`;

export const ButtonGroup = ({ children }) => {
   return <ButtonGroupWrapper>{children}</ButtonGroupWrapper>;
};
