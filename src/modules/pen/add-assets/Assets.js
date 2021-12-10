import { ModalContent } from '../../modal/styled-modal';
import ModalHeader from '../../modal/ModalHeader';
import { Box } from '../../../ui';
import { useState } from 'react';
import AssetsMenu from './AssetsMenu';
import Fonts from './Fonts';
import { Images } from './Images';
import { Icons } from './Icons';

// This component ( module ) is for managing assets (fonts, icons , ...) and is displayed as a modal
function Assets() {
   const [openSection, setOpenSection] = useState(0);

   return (
      <ModalContent>
         <ModalHeader title="Assets" />
         {/* Modal body */}
         <div className="flex responsive gap-4">
            <Box px=".5rem" className="f-item m4 flex inline gap-2">
               <AssetsMenu changeSection={setOpenSection} />
            </Box>

            <Box h="26rem" px=".5rem" className="f-item m8">
               {openSection === 0 && <Fonts />}
               {openSection === 1 && <Icons />}
               {openSection === 2 && <Images />}
            </Box>
         </div>
      </ModalContent>
   );
}

export default Assets;