import styled from 'styled-components';

import Button from './ui/Button';
import Flex from './ui/Flex';
import ButtonGroup from './ui/ButtonGroup';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ViewIcon } from './icons/ViewIcon';
import {
   faChevronDown,
   faCloud,
   faCog,
   faHeart,
} from '@fortawesome/free-solid-svg-icons';

const HeaderWrapper = styled(Flex)`
   height: 4rem;
   padding: 0.5rem;
   border-bottom: 1px solid var(--dark-border);
`;

const Header = () => {
   return (
      <HeaderWrapper alignItems="center" justifyContent="space-between">
         <p>sallam i am hassan</p>

         <Flex gap=".7rem">
            <Button>
               <FontAwesomeIcon icon={faHeart} />
            </Button>

            <ButtonGroup>
               <Button>
                  <FontAwesomeIcon icon={faCloud} />
                  Save
               </Button>

               <Button dense>
                  <FontAwesomeIcon icon={faChevronDown} />
               </Button>
            </ButtonGroup>

            <Button>
               <FontAwesomeIcon icon={faCog} />
               Settings
            </Button>

            <Button>
               <ViewIcon />
            </Button>
         </Flex>
      </HeaderWrapper>
   );
};

export default Header;
