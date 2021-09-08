import styled from 'styled-components';
import Flex from './Flex';

const ButtonGroupWrapper = styled(Flex)`
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

const ButtonGroup = ({ children }) => {
   return <ButtonGroupWrapper>{children}</ButtonGroupWrapper>;
};

export default ButtonGroup;
