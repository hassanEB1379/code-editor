import styled from 'styled-components';
import { Button } from '../../../ui';
import { useToggleConsole } from '../../console/contexts/ConsoleToggle-context';
import { useLogout } from '../../authentication/hooks/useLogout';
import { useControlModal } from '../../modal/ModalProvider';

// components displayed in modal
import Assets from '../add-assets/Assets';
import Libraries from '../add-libraries/Libraries';

const FooterWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 0.3rem;
   border-top: 1px solid var(--dark-border);
`;

const Footer = () => {
   const { toggle } = useToggleConsole();
   const { showModal } = useControlModal();
   const logout = useLogout();

   return (
      <FooterWrapper>
         <div className="flex gap-1">
            <Button sm onClick={toggle}>
               Console
            </Button>
            <Button sm onClick={() => showModal(<Assets />)}>
               Assets
            </Button>
            <Button sm onClick={() => showModal(<Libraries />)}>
               Libraries
            </Button>
         </div>

         <Button sm onClick={logout}>
            Logout
         </Button>
      </FooterWrapper>
   );
};

export default Footer;
