import styled from 'styled-components';
import { useState } from 'react';

import Button from '../../../ui/Button';
import Flex from '../../../ui/Flex';
import ButtonGroup from '../../../ui/ButtonGroup';
import Dropdown from '../../../ui/Dropdown';
import { Divider } from '../../../ui/Divider';

import {
   useViewLayout,
   useViewLayoutDispatch,
} from '../view-layout/ViewLayout.context';
import { useRun } from '../hooks/useRun';
import { useFullscreen } from '../../../hooks/useFullscreen';
import { usePen, usePenDispatch } from '../contexts/pen-context';
import { useSave } from '../hooks/useSave';

// icons
import ViewLayoutIcon from '../view-layout/ViewLayout.icon';
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

const StyledTitle = styled.h1`
   font-size: 1rem;

   & > svg {
      margin-left: 0.5rem;
      font-size: 0.85rem;
      cursor: pointer;
   }
`;

function Title() {
   const dispatch = usePenDispatch();
   const { title } = usePen();

   const [changeTitle, setChangeTitle] = useState(); // if changeTitle true ==> display form
   const [newTitle, setNewTitle] = useState(title); // handle title input

   function activeChangeTitleInput() {
      setChangeTitle(true);
   }
   function disableChangeTitleInput() {
      setChangeTitle(false);
   }
   function handleChangeTitle(e) {
      e.preventDefault();
      dispatch({ type: 'name', payload: newTitle });
      disableChangeTitleInput();
   }

   if (changeTitle) {
      return (
         <form onSubmit={handleChangeTitle}>
            <ChangeTitle
               autoFocus
               onBlur={disableChangeTitleInput}
               type="text"
               value={newTitle}
               onChange={e => setNewTitle(e.target.value)}
               spellCheck="false"
            />
         </form>
      );
   }

   return (
      <StyledTitle>
         {title}
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
   const save = useSave();

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
            <Button onClick={save} data-title="Save Ctrl+S">
               <FontAwesomeIcon icon={faSave} />
            </Button>

            <Button onClick={run} data-title="Run Shift+F10">
               <FontAwesomeIcon color="#37F900" icon={faPlay} />
            </Button>

            <Divider orientation="vertical" />

            <Button onClick={toggleFullScreen} data-title="Full screen F11">
               <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </Button>

            <ChangeViewDropdown />

            <Divider orientation="vertical" />

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
