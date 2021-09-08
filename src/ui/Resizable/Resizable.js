import { useEffect, useState } from 'react';
import { ResizableWrapper, ResizerX, ShowSize } from './Resizable.styled';

const Resizable = ({
   children,
   initialWidth = 100,
   enableShowSize = false,
}) => {
   const [width, setWidth] = useState(initialWidth);
   const [resize, setResize] = useState(false);
   const [showSize, setShowSize] = useState(false);

   const resizeStart = () => setResize(true);
   const resizeEnd = () => setResize(false);

   const handleResize = e => {
      if (resize) {
         setWidth(e.clientX);

         if (enableShowSize) setShowSize(true);
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

   // hidden ShowSize component after a few seconds
   useEffect(() => {
      const timer = setTimeout(() => setShowSize(false), 2000);

      return () => clearTimeout(timer);
   }, [width]);

   return (
      <ResizableWrapper style={{ width }}>
         <ResizerX onMouseDown={resizeStart} onMouseUp={resizeEnd} />

         {children}

         {enableShowSize && <ShowSize hidden={!showSize}>{width}px</ShowSize>}
      </ResizableWrapper>
   );
};

export default Resizable;
