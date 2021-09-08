import styled from 'styled-components';
import Flex from './ui/Flex';
import Button from './ui/Button';

const FooterWrapper = styled(Flex)`
   padding: 0.3rem;
`;

const Footer = () => {
   return (
      <FooterWrapper>
         <Button sm>Console</Button>
      </FooterWrapper>
   );
};

export default Footer;
