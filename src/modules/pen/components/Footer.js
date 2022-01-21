import { useState } from '@hookstate/core';
import { openConsoleState } from '../states';
import { Box, Button, Text } from '../../../ui';
import { useLogout } from '../../authentication/hooks/useLogout';
import { useLastSaveTime } from '../hooks/useLastSaveTime';
import { useControlModal } from '../../modal/ModalProvider';

// components displayed in modal
import Assets from '../add-assets/Assets';
import Libraries from '../add-libraries/Libraries';

const Footer = () => {
   const openConsole = useState(openConsoleState);

   const lastSave = useLastSaveTime();
   const { showModal } = useControlModal();
   const logout = useLogout();

   const toggleConsole = () => openConsole.set(p => !p);

   return (
      <footer style={{ backgroundColor: 'var(--primary)' }}>
         <Box
            borderB="1px solid var(--primary-light)"
            borderT="1px solid var(--primary-light)"
            p=".5rem"
            className="flex justify-between items-center"
         >
            <div className="flex gap-1">
               <Button sm onClick={toggleConsole}>
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
         </Box>

         <Text weight="300" size=".8rem" p=".5rem">
            Last save at {lastSave}
         </Text>
      </footer>
   );
};

export default Footer;
