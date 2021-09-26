import { ResizableWrapper, StyledResizer } from './Resizable.styled';
import { Children, useMemo, useRef } from 'react';

const Resizer = ({ minHeight }) => {
   const ref = useRef();

   function resize(ref, movement) {
      const nextElm = ref.current?.nextSibling;
      const prevElm = ref.current?.previousSibling;

      const coefficient = 1 / window.innerHeight;

      const changedSize = movement * coefficient;

      // get previous coefficient
      const prevElmSize = +prevElm.style.height.match(/([0-9]*[.])[0-9]+/)[0];
      const nextElmSize = +nextElm.style.height.match(/([0-9]*[.])[0-9]+/)[0];

      // update elements size
      let newPrevElmSize;
      let newNextElmSize;

      if (
         (prevElm.offsetHeight < minHeight && movement < 0) ||
         (nextElm.offsetHeight < minHeight && movement > 0)
      ) {
         // The height remains unchanged
         newPrevElmSize = `calc((100% - 0px) * ${prevElmSize})`;
         newNextElmSize = `calc((100% - 0px) * ${nextElmSize})`;
      } else {
         // calculate new sizes
         newPrevElmSize = `calc((100% - 0px) * ${prevElmSize + changedSize})`;
         newNextElmSize = `calc((100% - 0px) * ${nextElmSize - changedSize})`;
      }

      nextElm.style.height = newNextElmSize;
      prevElm.style.height = newPrevElmSize;
   }

   function handleResize(e) {
      resize(ref, e.movementY);
   }

   function handleResizeEnd() {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
   }

   function handleResizeStart() {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
   }

   return <StyledResizer onMouseDown={handleResizeStart} ref={ref} />;
};

const ResizableY = ({ children, direction, minHeight }) => {
   // calculate initial height
   const height = useMemo(() => {
      const coefficient = 1 / children.length;

      return `calc((100% - 0px) * ${coefficient})`;
   }, [children.length]);

   return (
      <ResizableWrapper direction={direction}>
         {Children.map(children, (child, index) => {
            return (
               <>
                  <div style={{ height }}>{child}</div>

                  {index !== children.length - 1 && (
                     <Resizer minHeight={minHeight} />
                  )}
               </>
            );
         })}
      </ResizableWrapper>
   );
};

export default ResizableY;
