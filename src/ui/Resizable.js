import { Fragment, Children, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styles that are necessary for Resizable to work
const ResizableContainer = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   flex-direction: ${({ orientation }) =>
      orientation === 'vertical' ? 'column' : 'row'};
`;

const HorizontalResizer = styled.div.attrs(() => ({
   className: 'tablet',
}))`
   z-index: var(--z-999);
   cursor: row-resize;
   width: 100%;
   height: 0.25rem;
   margin-bottom: -0.25rem;
   border-top: var(--border);
`;

const VerticalResizer = styled.div.attrs(() => ({
   className: 'tablet',
}))`
   z-index: var(--z-999);
   cursor: col-resize;
   width: 0.25rem;
   height: 100%;
   margin-left: -0.25rem;
   border-right: var(--border);
`;

const StyledResizableItem = styled.div`
   overflow: auto;
   flex-shrink: 1;
   & > * {
      height: 100%;
   }
`;

function GetResizer({ orientation, ...rest }) {
   if (orientation === 'vertical') {
      return <HorizontalResizer {...rest} />;
   }

   if (orientation === 'horizontal') {
      return <VerticalResizer {...rest} />;
   }
}

function ResizableItem({ children, initialSize, dimension }) {
   const ref = useRef();

   let itemWrapperStyle = {
      [dimension]: `calc(${initialSize}% + var(--changed-size ,0px))`,
   };

   // reset css variable when validElements change
   useEffect(() => {
      ref.current?.style.setProperty('--changed-size', '0px');
   }, [initialSize]);

   return (
      <StyledResizableItem ref={ref} style={itemWrapperStyle}>
         {children}
      </StyledResizableItem>
   );
}

export function Resizable({
   children,
   minSize = 0,
   orientation = 'horizontal',
   ...rest
}) {
   let validElements = Children.toArray(children);

   // This function returns attribute names based on orientation.
   let ifVertical = (ifTrue, ifFalse) =>
      orientation === 'vertical' ? ifTrue : ifFalse;

   function resize(startPoint, currentPoint, prevElm, nextElm) {
      // total mouse movement
      let movement = currentPoint - startPoint;

      function updateElementsSizes({ newPrevElmSize, newNextElmSize }) {
         let prevElmSize = prevElm[ifVertical('offsetHeight', 'offsetWidth')];
         let nextElmSize = nextElm[ifVertical('offsetHeight', 'offsetWidth')];

         if (
            (prevElmSize > minSize && movement < 0) ||
            (nextElmSize > minSize && movement > 0)
         ) {
            prevElm.style.setProperty('--changed-size', newPrevElmSize + 'px');
            nextElm.style.setProperty('--changed-size', newNextElmSize + 'px');
         }
      }

      function calcNewSizes() {
         // calculate new size
         let newPrevElmSize =
            +getComputedStyle(prevElm)
               .getPropertyValue('--changed-size')
               .slice(0, -2) + movement;

         let newNextElmSize =
            +getComputedStyle(nextElm)
               .getPropertyValue('--changed-size')
               .slice(0, -2) - movement;

         return { newPrevElmSize, newNextElmSize };
      }

      updateElementsSizes(calcNewSizes());
   }

   // start resizing when mouse down on resizer
   function resizeStart(e1) {
      function applyToAllFrames(callback) {
         for (let i = 0; i < window.frames.length; i++) {
            let frame = window.frames[i];
            callback(frame);
         }
      }

      // Styles applied to the body during resizing
      document.body.style.userSelect = 'none';
      document.body.style.cursor = ifVertical('row-resize', 'col-resize');
      applyToAllFrames(
         ({ frameElement }) => (frameElement.style.pointerEvents = 'none')
      );

      let prevElm = e1.target.previousSibling;
      let nextElm = e1.target.nextSibling;

      // position of mouse in start resizing (when mouse down)
      let startPoint = e1.nativeEvent[ifVertical('offsetY', 'offsetX')];

      function handleResize(e2) {
         // calculate position of mouse from left edge (for horizontal) and top (for vertical) of resizer when moving the mouse
         let currentPoint =
            e2[ifVertical('clientY', 'clientX')] -
            e1.target.getBoundingClientRect()[ifVertical('top', 'left')];

         resize(startPoint, currentPoint, prevElm, nextElm);
      }

      // end resizing when mouse up
      function resizeEnd() {
         // remove applied styles
         document.body.style.userSelect = 'auto';
         document.body.style.cursor = 'initial';
         applyToAllFrames(
            ({ frameElement }) => (frameElement.style.pointerEvents = 'initial')
         );

         // remove events
         window.removeEventListener('mousemove', handleResize);
         window.removeEventListener('mouseup', resizeEnd);
         // remove events from frames
         applyToAllFrames(frame => {
            frame.removeEventListener('mousemove', handleResize);
            frame.removeEventListener('mouseup', resizeEnd);
         });
      }

      // Add events
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', resizeEnd);

      // Add events to frames
      applyToAllFrames(frame => {
         frame.addEventListener('mousemove', handleResize);
         frame.addEventListener('mouseup', resizeEnd);
      });
   }

   return (
      <ResizableContainer {...rest} orientation={orientation}>
         {validElements.map((element, index) => (
            <Fragment key={index}>
               <ResizableItem
                  dimension={ifVertical('height', 'width')}
                  initialSize={100 / validElements.length}
               >
                  {element}
               </ResizableItem>

               {index !== validElements.length - 1 && (
                  <GetResizer
                     orientation={orientation}
                     onMouseDown={resizeStart}
                  />
               )}
            </Fragment>
         ))}
      </ResizableContainer>
   );
}
