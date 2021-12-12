import { ModalContent, ModalFooter } from '../../modal/styled-modal';
import ModalHeader from '../../modal/ModalHeader';
import { Box, Button, Divider } from '../../../ui';
import { Input, SearchInput } from '../../../ui/Input';
import { Text } from '../../../ui/Text';

// This component ( module ) is for managing packages added to project
function Packages() {
   return (
      <ModalContent>
         <ModalHeader title="Packages" />
         {/* Modal body */}
         <div className="flex responsive gap-4">
            <Box px=".5rem" className="f-item m4 flex inline gap-2" />

            <Box h="26rem" px=".5rem" className="f-item m8">
               <Text as="h4" mb="1rem">
                  Add External libraries and packages from CDNjs
               </Text>
               <SearchInput placeholder="Search CDN" />

               <Box mt="2rem" className="flex dir-c gap-1">
                  <Text>List of cdn links </Text>
                  <Text fStyle="italic" size=".9rem">
                     The links are rendered in the order in which they are
                     listed
                  </Text>
                  <Divider />
                  <Input placeholder="Address of script cdn" />
                  <Input placeholder="Address of script cdn" />
                  <Input placeholder="Address of script cdn" />
                  <Input placeholder="Address of script cdn" />
               </Box>
            </Box>
         </div>

         <ModalFooter>
            <Button>Save & Close</Button>
         </ModalFooter>
      </ModalContent>
   );
}

export default Packages;
