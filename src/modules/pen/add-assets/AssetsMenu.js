import styled from 'styled-components';
import { Box } from '../../../ui';

const MobileItem = styled(Box).attrs(() => ({
   p: '.25rem .5rem',
   round: '.25rem',
}))`
   cursor: pointer;
   transition: color 0.2s ease;
   &:hover {
      color: var(--info);
   }
`;
const DesktopItem = styled(Box).attrs(() => ({
   as: 'li',
   p: '.5rem',
   mb: '.5rem',
}))`
   overflow: hidden;
   position: relative;
   cursor: pointer;
   // implement hover effect
   transition: border-left 0.2s ease-out;
   border-left: 0 solid var(--info);
   &:hover {
      border-left: thick solid var(--info);
   }
   &:before {
      content: ' ';
      width: 50px;
      height: 50px;
      position: absolute;
      background-color: var(--info);
      opacity: 0.4;
      bottom: 100%;
      right: 100%;
      transform: scale(0);
      border-radius: 50%;
      transition: transform 0.3s ease-out;
   }
   &:hover:before {
      transform: scale(12);
   }
`;
// This component render assets menu responsively
function AssetsMenu({ changeSection }) {
   return (
      <>
         {/* for mobile */}
         <div className="mobile flex">
            <MobileItem onClick={() => changeSection(0)}>Fonts</MobileItem>
            <MobileItem onClick={() => changeSection(1)}>Images</MobileItem>
         </div>

         {/* for desktop */}
         <Box as="ul" w="100%" className="tablet">
            <DesktopItem onClick={() => changeSection(0)}>Fonts</DesktopItem>
            <DesktopItem onClick={() => changeSection(1)}>Images</DesktopItem>
         </Box>
      </>
   );
}

export default AssetsMenu;
