import styled from 'styled-components';
import { useState } from 'react';

import Button from './ui/Button';
import Flex from './ui/Flex';
import ButtonGroup from './ui/ButtonGroup';
import Dropdown from './ui/Dropdown';
import {
   useViewLayout,
   useViewLayoutDispatch,
} from './modules/pen/view-layout/ViewLayout.context';
import ViewLayoutIcon from './modules/pen/view-layout/ViewLayout.icon';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCompress,
   faEdit,
   faExpand,
   faHeart,
   faPlay,
   faSave,
   faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useRun } from './modules/pen/useRun';
import { useFullscreen } from './useFullscreen';

const HeaderWrapper = styled(Flex)`
   height: 4rem;
   padding: 0.5rem 0.75rem;
   border-bottom: 1px solid var(--dark-border);
`;

const ChangeTitle = styled.input`
   background-color: inherit;
   color: inherit;
   font-weight: 700;
   width: 150px;
`;

const Divider = styled.hr`
   transform: rotate(180deg);
   border: none;
   margin: 0.3rem 0;
   width: 1px;
   background-color: var(--divider-bg);
`;

const StyledTitle = styled.h1`
   font-size: 1rem;

   & > svg {
      margin-left: 0.5rem;
      font-size: 0.85rem;
      cursor: pointer;
   }
`;

function Title() {
   const [changeTitle, setChangeTitle] = useState();

   function activeChangeTitleInput() {
      setChangeTitle(true);
   }

   function disableChangeTitleInput() {
      setChangeTitle(false);
   }

   function handleChangeTitle(e) {
      e.preventDefault();
   }

   if (changeTitle) {
      return (
         <form onSubmit={handleChangeTitle}>
            <ChangeTitle
               autoFocus
               onBlur={disableChangeTitleInput}
               type="text"
            />
         </form>
      );
   }

   return (
      <StyledTitle>
         Untitled
         <FontAwesomeIcon onClick={activeChangeTitleInput} icon={faEdit} />
      </StyledTitle>
   );
}

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
   const run = useRun();

   const { toggleFullScreen, isFullscreen } = useFullscreen();

   return (
      <HeaderWrapper items="center" justify="space-between">
         <Flex items="center" gap="1rem">
            <img
               src="/static/images/logo.png"
               width="28px"
               height="28px"
               alt="website-logo"
            />
            <Title />
         </Flex>

         <Flex gap=".7rem">
            <Button data-title="Save Ctrl+S">
               <FontAwesomeIcon icon={faSave} />
            </Button>

            <Button onClick={run} data-title="Run Shift+F10">
               <FontAwesomeIcon color="#37F900" icon={faPlay} />
            </Button>

            <Divider />

            <Button onClick={toggleFullScreen} data-title="Full screen F11">
               <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </Button>

            <ChangeViewDropdown />

            <Divider />

            <Button data-title="Share">
               <FontAwesomeIcon icon={faShareAlt} />
            </Button>

            <Button data-title="Like">
               <FontAwesomeIcon icon={faHeart} />
            </Button>
         </Flex>
      </HeaderWrapper>
   );
};

export default Header;
