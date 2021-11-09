import { Fragment, Children } from 'react';
import styled from 'styled-components';

// Styles that are necessary for Resizable to work
const ResizableContainer = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   flex-direction: ${({ orientation }) =>
      orientation === 'vertical' ? 'column' : 'row'};
`;

const Resizer = styled.div`
   background-color: var(--dark-bg);
   border: 1px solid var(--dark-border);
   width: ${({ orientation }) =>
      orientation === 'vertical' ? '100%' : '1rem'};
   height: ${({ orientation }) =>
      orientation === 'vertical' ? '1rem' : '100%'};
   cursor: ${({ orientation }) =>
      orientation === 'vertical' ? 'row-resize' : 'col-resize'};
`;

const ResizableItem = styled.div`
   overflow: auto;
   flex-shrink: 1;
`;

export function Resizable({
   children,
   minSize = 0,
   orientation = 'horizontal',
}) {
   let validElements = Children.toArray(children);

   // This function returns attribute names based on orientation.
   let ifVertical = (ifTrue, ifFalse) =>
      orientation === 'vertical' ? ifTrue : ifFalse;

   let initialSize = 100 / validElements.length;
   let dimension = ifVertical('height', 'width');
   let itemWrapperStyle = {
      [dimension]: `calc(${initialSize}% + 0px)`,
   };

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
            prevElm.style[dimension] = newPrevElmSize;
            nextElm.style[dimension] = newNextElmSize;
         }
      }

      function calcNewSizes() {
         // regex for find "px" section of size
         let regex = /[+-]?([0-9]*[.])?[0-9]+px/;

         // calculate new size
         let newPrevElmSize = prevElm.style[dimension].replace(
            regex,
            t => `${+t.slice(0, -2) + movement}px`
         );
         let newNextElmSize = nextElm.style[dimension].replace(
            regex,
            t => `${+t.slice(0, -2) - movement}px`
         );

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
      <ResizableContainer orientation={orientation}>
         {validElements.map((element, index) => (
            <Fragment key={index}>
               <ResizableItem style={itemWrapperStyle}>{element}</ResizableItem>

               {index !== validElements.length - 1 && (
                  <Resizer
                     orientation={orientation}
                     onMouseDown={resizeStart}
                  />
               )}
            </Fragment>
         ))}
      </ResizableContainer>
   );
}
