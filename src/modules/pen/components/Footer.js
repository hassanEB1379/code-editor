import styled from 'styled-components';
import { Button, Group, Spacing } from '../../../ui';
import { useToggleConsole } from '../../console/contexts/ConsoleToggle-context';
import { useLogout } from '../../authentication/hooks/useLogout';
import { useControlModal } from '../../modal/ModalProvider';
import Assets from '../add-assets/Assets';

const FooterWrapper = styled(Spacing).attrs(() => ({
   className: 'flex justify-between',
   p: '.3rem',
}))`
   border-top: 1px solid var(--dark-border);
`;

const Footer = () => {
   const { toggle } = useToggleConsole();
   const { showModal } = useControlModal();

   const logout = useLogout();

   // Show assets modal component when click on button
   const handleShowAssets = () => showModal(<Assets />);

   return (
      <FooterWrapper>
         <Group spaceX=".2">
            <Button sm onClick={toggle}>
               Console
            </Button>
            <Button sm onClick={handleShowAssets}>
               Assets
            </Button>
         </Group>

         <Button sm onClick={logout}>
            Logout
         </Button>
      </FooterWrapper>
   );
};

export default Footer;
