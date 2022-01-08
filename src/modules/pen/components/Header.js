import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { ChangeViewDropdown } from '../view-layout/ChangeViewDropdown';
import {
   Button,
   Divider,
   Dropdown,
   Menu,
   MenuItem,
   SimpleButton,
   Text,
} from '../../../ui';
import { useRun } from '../hooks/useRun';
import { useFullscreen } from '../../../hooks/useFullscreen';
import { changeTitle, usePen, usePenDispatch } from '../contexts/pen-context';
import { useSave } from '../hooks/useSave';
import { useUnsavedChangesCount } from '../contexts/unsaved-changes-context';
import { useHandleShortcuts } from '../hooks/useHandleShortcuts';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faArrowRight,
   faCompress,
   faExpand,
   faPlay,
   faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
   BackIcon,
   EditIcon,
   MenuIcon,
   PlayIcon,
   SaveIcon,
} from '../../../ui/icons/icons';

const HeaderWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 4rem;
   padding: 0.5rem 0.75rem;
   background-color: var(--primary);
   border-bottom: 1px solid var(--primary-light);
`;

const ChangeTitle = styled.input`
   background-color: inherit;
   color: inherit;
   font-weight: 700;
   font-size: 1.2rem;
   letter-spacing: 1px;
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

         <SaveIcon />
      </Button>
   );
}

function Title() {
   const dispatch = usePenDispatch();
   const { title } = usePen();

   const [displayForm, setDisplayForm] = useState(false);
   const [newTitle, setNewTitle] = useState(title ?? ''); // handle title input

   function activeChangeTitleInput() {
      setDisplayForm(true);
   }
   function disableChangeTitleInput() {
      setDisplayForm(false);
   }
   function handleChangeTitle(e) {
      e.preventDefault();
      if (newTitle) {
         dispatch(changeTitle(newTitle));
         disableChangeTitleInput();
      }
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
      <Text as="h1" size="1.2rem">
         {title}{' '}
         <SimpleButton>
            <EditIcon onClick={activeChangeTitleInput} />
         </SimpleButton>
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
         <MenuIcon />
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
            <PlayIcon />
         </Button>

         <Divider orientation="vertical" />

         <Button onClick={toggleFullScreen} title="Full screen F11">
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
         </Button>

         <ChangeViewDropdown />

         <Divider orientation="vertical" />

         <Link to="/my-works">
            <Button title="Back to my works">
               <BackIcon />
            </Button>
         </Link>
      </div>
   );
}

const Header = () => {
   useHandleShortcuts();

   return (
      <HeaderWrapper>
         <Title />
         <ActionsDropDown />
         <ActionsBar />
      </HeaderWrapper>
   );
};

export default Header;
