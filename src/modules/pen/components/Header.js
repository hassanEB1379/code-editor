import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { ChangeViewDropdown } from '../view-layout/ChangeViewDropdown';
import { Button, Divider, Dropdown, Menu, MenuItem, Text } from '../../../ui';
import { useRun } from '../hooks/useRun';
import { useFullscreen } from '../../../hooks/useFullscreen';
import { changeTitle, usePen, usePenDispatch } from '../contexts/pen-context';
import { useSave } from '../hooks/useSave';
import { useUnsavedChangesCount } from '../contexts/unsaved-changes-context';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAlignJustify,
   faArrowRight,
   faCompress,
   faEdit,
   faExpand,
   faPlay,
   faSave,
} from '@fortawesome/free-solid-svg-icons';
import { useHandleShortcuts } from '../hooks/useHandleShortcuts';

const HeaderWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
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

const Indicator = styled.span`
   position: absolute;
   top: 0;
   left: 0;
   height: 0.3rem;
   background-color: var(--warning);
   transition: width 0.2s ease-out;

   // transition effect
   width: ${({ state }) =>
      state === 'exiting' || state === 'exited' || state === 'entering'
         ? 0
         : '100%'};
`;

function SaveButton(props) {
   const unsavedChanges = useUnsavedChangesCount();

   return (
      <Button {...props}>
         <Transition in={unsavedChanges > 10} timeout={200}>
            {state => <Indicator state={state} />}
         </Transition>

         <FontAwesomeIcon icon={faSave} />
      </Button>
   );
}

function Title() {
   const dispatch = usePenDispatch();
   const { title } = usePen();

   const [displayForm, setDisplayForm] = useState(false);
   const [newTitle, setNewTitle] = useState(title); // handle title input

   function activeChangeTitleInput() {
      setDisplayForm(true);
   }
   function disableChangeTitleInput() {
      setDisplayForm(false);
   }
   function handleChangeTitle(e) {
      e.preventDefault();
      dispatch(changeTitle(newTitle));
      disableChangeTitleInput();
   }

   if (displayForm) {
      return (
         <form onSubmit={handleChangeTitle}>
            <ChangeTitle
               autoFocus
               onBlur={handleChangeTitle}
               type="text"
               value={newTitle}
               onChange={e => setNewTitle(e.target.value)}
               spellCheck="false"
            />
         </form>
      );
   }

   return (
      <Text as="h1" size="1rem">
         {title}{' '}
         <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            size="sm"
            onClick={activeChangeTitleInput}
            icon={faEdit}
         />
      </Text>
   );
}

// Actions dropdown menu for mobile
function ActionsDropDown() {
   const run = useRun();
   const save = useSave();

   const { toggleFullScreen, isFullscreen } = useFullscreen();

   const DropdownToggleButton = (
      <Button title="Actions">
         <FontAwesomeIcon icon={faAlignJustify} />
      </Button>
   );

   return (
      <Dropdown className="mobile" action={DropdownToggleButton}>
         <Menu>
            <MenuItem icon={faSave} onClick={save}>
               Save Ctrl+S
            </MenuItem>
            <MenuItem icon={faPlay} onClick={run}>
               Run Shift+F10
            </MenuItem>
            <MenuItem
               icon={isFullscreen ? faCompress : faExpand}
               onClick={toggleFullScreen}
            >
               Full screen
            </MenuItem>
            <MenuItem icon={faArrowRight} component={Link} to="/my-works">
               Go to works
            </MenuItem>
         </Menu>
      </Dropdown>
   );
}

// Actions bar for desktop and tablet
function ActionsBar() {
   const run = useRun();
   const save = useSave();

   const { toggleFullScreen, isFullscreen } = useFullscreen();

   return (
      <div className="flex gap-2 tablet">
         <SaveButton onClick={save} title="Save Ctrl+S" />

         <Button onClick={run} title="Run Shift+F10">
            <FontAwesomeIcon color="#37F900" icon={faPlay} />
         </Button>

         <Divider orientation="vertical" />

         <Button onClick={toggleFullScreen} title="Full screen F11">
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
         </Button>

         <ChangeViewDropdown />

         <Divider orientation="vertical" />

         <Link to="/my-works">
            <Button title="Back to my works">
               <FontAwesomeIcon icon={faArrowRight} />
            </Button>
         </Link>
      </div>
   );
}

const Header = () => {
   useHandleShortcuts();

   return (
      <HeaderWrapper>
         <div className="flex items-center gap-2">
            <img
               src="/static/images/logo.png"
               width="28px"
               height="28px"
               alt="website-logo"
            />
            <Title />
         </div>

         <ActionsDropDown />
         <ActionsBar />
      </HeaderWrapper>
   );
};

export default Header;
