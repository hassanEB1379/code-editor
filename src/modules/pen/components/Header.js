import styled from 'styled-components';
import { useState } from '@hookstate/core';
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
import { useSave } from '../hooks/useSave';
import { useHandleShortcuts } from '../hooks/useHandleShortcuts';

// states
import { penState, unsavedChangesState } from '../states';

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
   const unsavedChanges = useState(unsavedChangesState);

   return (
      <Button {...props}>
         <Transition in={unsavedChanges.get() > 10} timeout={200}>
            {state => <Indicator state={state} />}
         </Transition>

         <SaveIcon />
      </Button>
   );
}

function Title() {
   const pen = useState(penState);

   const displayForm = useState(false);
   const newTitle = useState(pen.title.get());

   const activeInput = () => displayForm.set(true);
   const disableInput = () => displayForm.set(false);

   function handleChangeTitle(e) {
      e.preventDefault();

      if (newTitle.get()) {
         pen.title.set(newTitle.get());
      } else {
         // reset default value if input is empty
         newTitle.set(pen.title.get());
      }

      disableInput();
   }

   if (displayForm.get()) {
      return (
         <form onSubmit={handleChangeTitle}>
            <ChangeTitle
               autoFocus
               onBlur={handleChangeTitle}
               type="text"
               value={newTitle.get()}
               onChange={e => newTitle.set(e.target.value)}
               spellCheck="false"
            />
         </form>
      );
   }

   return (
      <Text as="h1" size="1.2rem">
         {pen.title.get()}{' '}
         <SimpleButton>
            <EditIcon onClick={activeInput} />
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
            <MenuItem onClick={save} icon={faSave}>
               Save Ctrl+S
            </MenuItem>
            <MenuItem onClick={run} icon={faPlay}>
               Run Shift+F10
            </MenuItem>
            <MenuItem
               icon={isFullscreen ? faCompress : faExpand}
               onClick={toggleFullScreen}
            >
               Full screen
            </MenuItem>
            <MenuItem icon={faArrowRight} as={Link} to="/my-works">
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
         <SaveButton title="Save Ctrl+S" onClick={save} />

         <Button title="Run Shift+F10" onClick={run}>
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
