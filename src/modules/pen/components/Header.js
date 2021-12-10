import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { ChangeViewDropdown } from '../view-layout/ChangeViewDropdown';
import { isDesktop, isMobile } from 'react-device-detect';
import { Button, Divider, Dropdown, Menu, MenuItem } from '../../../ui';
import { useRun } from '../hooks/useRun';
import { useFullscreen } from '../../../hooks/useFullscreen';
import { usePen, usePenDispatch } from '../contexts/pen-context';
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

const HeaderWrapper = styled.div.attrs(() => ({
   className: 'flex items-center justify-between',
}))`
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
            {state => (
               // state change: exited -> entering -> entered -> exiting -> exited
               <Indicator state={state} />
            )}
         </Transition>

         <FontAwesomeIcon icon={faSave} />
      </Button>
   );
}

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
      <StyledTitle>
         {title}
         <FontAwesomeIcon onClick={activeChangeTitleInput} icon={faEdit} />
      </StyledTitle>
   );
}

function ActionButtons() {
   const run = useRun();
   const save = useSave();

   const { toggleFullScreen, isFullscreen } = useFullscreen();

   if (isMobile) {
      // Action buttons in mobile
      const DropdownToggleButton = (
         <Button title="Actions">
            <FontAwesomeIcon icon={faAlignJustify} />
         </Button>
      );

      const DropdownContent = (
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
      );
      return (
         <Dropdown action={DropdownToggleButton}>{DropdownContent}</Dropdown>
      );
   }

   if (isDesktop) {
      // Action buttons in desktop
      return (
         <div className="flex gap-2">
            <SaveButton onClick={save} data-title="Save Ctrl+S" />

            <Button onClick={run} data-title="Run Shift+F10">
               <FontAwesomeIcon color="#37F900" icon={faPlay} />
            </Button>

            <Divider orientation="vertical" />

            <Button onClick={toggleFullScreen} data-title="Full screen F11">
               <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </Button>

            <ChangeViewDropdown />

            <Divider orientation="vertical" />

            <Link to="/my-works">
               <Button data-title="Back to my works">
                  <FontAwesomeIcon icon={faArrowRight} />
               </Button>
            </Link>
         </div>
      );
   }
}

const Header = () => {
   const run = useRun();
   const save = useSave();

   // This effect handle editor shortcuts
   useEffect(() => {
      function handleShortcuts(e) {
         if (e.ctrlKey && e.keyCode === 83) {
            // Ctrl + S ==> pen saved
            e.preventDefault();
            save();
         } else if (e.shiftKey && e.keyCode === 121) {
            // Shift + F10 ==> run code
            e.preventDefault();
            run();
         }
      }
      window.addEventListener('keydown', handleShortcuts);
      return () => {
         window.removeEventListener('keydown', handleShortcuts);
      };
   }, [run, save]);

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

         {/* Action buttons bar*/}
         <ActionButtons />
      </HeaderWrapper>
   );
};

export default Header;
