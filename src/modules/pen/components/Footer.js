import styled from 'styled-components';
import Flex from '../../../ui/Flex';
import Button from '../../../ui/Button';
import { useToggleConsole } from '../console/ConsoleToggle.context';
import { useLogout } from '../../authentication/hooks/useLogout';

const FooterWrapper = styled(Flex)`
   padding: 0.3rem;
   border-top: 1px solid var(--dark-border);
`;

const Footer = () => {
   const { toggle } = useToggleConsole();

   const logout = useLogout();

   return (
      <FooterWrapper justify="space-between">
         <Button sm onClick={toggle}>
            Console
         </Button>
         <Button sm onClick={logout}>
            Logout
         </Button>
      </FooterWrapper>
   );
};

export default Footer;
