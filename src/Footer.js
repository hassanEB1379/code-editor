import styled from 'styled-components';
import Flex from './Flex';
import Button from './Button';

const FooterWrapper = styled(Flex)`
   padding: 0.3rem;
   background-color: var(--dark-bg);
`;

const Footer = () => {
   return (
      <FooterWrapper>
         <Button sm>Console</Button>
      </FooterWrapper>
   );
};

export default Footer;
