import styled from 'styled-components';
import Flex from './ui/Flex';
import Button from './ui/Button';
import { useToggleConsole } from './modules/pen/Console.context';

const FooterWrapper = styled(Flex)`
   padding: 0.3rem;
   border-top: 1px solid var(--dark-border);
`;

const Footer = () => {
   const { toggle } = useToggleConsole();

   return (
      <FooterWrapper>
         <Button sm onClick={toggle}>
            Console
         </Button>
      </FooterWrapper>
   );
};

export default Footer;
