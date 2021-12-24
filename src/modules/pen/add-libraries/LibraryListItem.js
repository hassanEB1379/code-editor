import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useChangeOrder, useRemoveLibrary } from './Libraries-hooks';
import { Box, Text } from '../../../ui';
import { Transition } from 'react-transition-group';
import { getTranslateValues } from '../../../utils/getTranslateValue';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAngleDown,
   faAngleUp,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';

const transitionStyles = {
   exiting: { opacity: 0, transition: 'opacity 300ms ease-in-out' },
   exited: { opacity: 0, transition: 'opacity 300ms ease-in-out' },
};

const StyledListItem = styled(Text).attrs(() => ({
   truncate: true,
   textColor: 'var(--black)',
   lineH: '3rem',
   style: {
      transform: 'translate3d(0 , 0 , 0)',
   },
}))`
   position: relative;
   width: 100%;
   min-height: 3rem;
   padding: 0 2.5rem 0 1rem;
   border-radius: 0.25rem;
   background-color: var(--input-bg);
   cursor: move;
   user-select: none;
   transition: transform 300ms ease-out;
`;

const RemoveFlag = styled.span`
   display: flex;
   align-items: center;
   flex-direction: row-reverse;
   padding-right: 1rem;
   background-color: var(--error);
   position: absolute;
   inset: 0;
`;

const ChangeOrderContainer = styled.span`
   position: absolute;
   top: 0;
   right: 0;
   height: 100%;
   padding-right: 1rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   color: var(--black);
   opacity: 0.4;
   cursor: pointer;
`;

const ChangeOrderButton = styled.button`
   display: inline-block;
   height: 1rem;
   line-height: 1rem;

   &[disabled] {
      opacity: 0.2;
      cursor: auto;
   }
`;

function Swipeable({ onSwipe, onSwipeEnd, children, component: Component }) {
   const startMousePosition = useRef();
   const ref = useRef();

   function setMovement(elm, value) {
      elm.style.setProperty('transform', `translate3d(${value}, 0,0)`);
   }

   function start(e) {
      // set mousemove event on list item when mouse down
      ref.current?.addEventListener('mousemove', move);
      ref.current?.addEventListener('touchmove', move);
      // end move if mouse leave form element
      ref.current?.addEventListener('mouseleave', end);
      // set start point
      startMousePosition.current = e.clientX || e.touches[0].clientX;
   }

   function move(e) {
      // calculate mouse movement
      let currentMousePosition = e.clientX || e.touches[0].clientX;
      let movement = currentMousePosition - startMousePosition.current;

      // if move to right terminate function
      if (movement > 0) return;

      onSwipe(movement);

      // if move to right update movement variable and move element with translate3d css function
      setMovement(ref.current, `${movement}px`);
      ref.current['style'].transition = 'none';
   }

   function end() {
      // positive value of element movement
      let movement = getTranslateValues(ref.current);
      movement = -movement.x;

      // remove transition applied to element in move
      ref.current['style'].transition = '';

      if (movement > 200) {
         setMovement(ref.current, '-100%');
      } else {
         setMovement(ref.current, 0);
      }

      onSwipeEnd(movement);

      // remove event listeners set in start
      ref.current?.removeEventListener('mousemove', move);
      ref.current?.removeEventListener('mouseleave', end);
   }

   return (
      <Component
         onTouchStart={start}
         onTouchEnd={end}
         onMouseDown={start}
         onMouseUp={end}
         ref={ref}
      >
         {children}
      </Component>
   );
}

function ChangeOrder({ index, length }) {
   const changeOrder = useChangeOrder();

   // handle change order of libraries
   function goUp() {
      changeOrder(index, index - 1);
   }

   function goDown() {
      changeOrder(index, index + 1);
   }

   return (
      <ChangeOrderContainer>
         <ChangeOrderButton disabled={index === 0} onClick={goUp}>
            <FontAwesomeIcon size="lg" icon={faAngleUp} />
         </ChangeOrderButton>
         <ChangeOrderButton disabled={index === length - 1} onClick={goDown}>
            <FontAwesomeIcon size="lg" icon={faAngleDown} />
         </ChangeOrderButton>
      </ChangeOrderContainer>
   );
}

export function LibraryListItem({ library, length, index }) {
   const [removeEffect, setRemoveEffect] = useState(true);

   const flagRef = useRef();

   const remove = useRemoveLibrary();

   function updateFlagOpacity(movement) {
      let elm = flagRef.current;
      if (-movement < 200) elm['style'].opacity = -movement / 200;
      else elm['style'].opacity = 1;
   }

   function startRemoveEffect(movement) {
      if (movement > 200) setRemoveEffect(false);
   }

   function removeLibrary() {
      remove(library);
   }

   return (
      <Box round=".25rem" pos="relative">
         <Transition
            onExited={removeLibrary}
            in={removeEffect}
            timeout={300}
            unmountOnExit
         >
            {state => (
               <RemoveFlag style={{ ...transitionStyles[state] }} ref={flagRef}>
                  <FontAwesomeIcon size="lg" icon={faTrash} />
               </RemoveFlag>
            )}
         </Transition>

         <Swipeable
            component={StyledListItem}
            onSwipeEnd={startRemoveEffect}
            onSwipe={updateFlagOpacity}
         >
            {library['latest']}
            <ChangeOrder index={index} length={length} />
         </Swipeable>
      </Box>
   );
}
