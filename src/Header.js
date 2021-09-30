import styled from 'styled-components';

import Button from './ui/Button';
import Flex from './ui/Flex';
import ButtonGroup from './ui/ButtonGroup';
import Dropdown from './ui/Dropdown';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faChevronDown,
   faCloud,
   faCog,
   faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
   useViewLayout,
   useViewLayoutDispatch,
} from './modules/pen/ViewLayout.context';
import ViewLayoutIcon from './modules/pen/ViewLayout.icon';

const HeaderWrapper = styled(Flex)`
   height: 4rem;
   padding: 0.5rem;
   border-bottom: 1px solid var(--dark-border);
`;

function ChangeViewDropdown() {
   const dispatch = useViewLayoutDispatch();

   const { icon } = useViewLayout();

   function changeLayout(type) {
      dispatch({ type });
   }

   return (
      <Dropdown action={<Button>{icon}</Button>}>
         <Flex gap=".7rem" p=".5rem" flexDir="column">
            <h4>Change view</h4>
            <ButtonGroup>
               <Button wide onClick={() => changeLayout('default')}>
                  <ViewLayoutIcon rotate={-90} />
               </Button>

               <Button wide onClick={() => changeLayout('vertical')}>
                  <ViewLayoutIcon />
               </Button>
            </ButtonGroup>
         </Flex>
      </Dropdown>
   );
}

const Header = () => {
   return (
      <HeaderWrapper items="center" justify="space-between">
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

            <ChangeViewDropdown />
         </Flex>
      </HeaderWrapper>
   );
};

export default Header;
