import styled from 'styled-components';
import { useEffect, useState } from 'react';

const ResizableWrapper = styled.div`
   position: relative;
`;

const ResizerX = styled.div`
   cursor: col-resize;
   width: 1rem;
   position: absolute;
   right: 0;
   height: 100%;
   z-index: 10;
   background-color: var(--dark-bg);
   border-left: 1px solid var(--dark-border);
`;

const Resizable = ({ children, initialWidth = 100 }) => {
   const [width, setWidth] = useState(initialWidth);
   const [resize, setResize] = useState(false);

   const resizeStart = () => setResize(true);
   const resizeEnd = () => setResize(false);

   const handleResize = e => {
      if (resize) {
         setWidth(e.clientX);
      }
   };

   useEffect(() => {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', resizeEnd);

      return () => {
         window.removeEventListener('mousemove', handleResize);
         window.removeEventListener('mouseup', resizeEnd);
      };
   });

   return (
      <ResizableWrapper style={{ width }}>
         <ResizerX onMouseDown={resizeStart} onMouseUp={resizeEnd} />
         {children}
      </ResizableWrapper>
   );
};

export default Resizable;
