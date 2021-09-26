import { useRef } from 'react';
import capitalize from '../../utils/capitalize';
import { StyledResizer } from './Resizable.styled';

export const Resizer = ({ orientation, minSize }) => {
   const ref = useRef();

   function resize(ref, movement) {
      const dimension = orientation === 'horizontal' ? 'width' : 'height';

      const nextElm = ref.current?.nextSibling;
      const prevElm = ref.current?.previousSibling;

      const coefficient = 1 / window['inner' + capitalize(dimension)];

      const changedSize = movement * coefficient;

      // get previous coefficient
      const prevElmSize =
         +prevElm.style[dimension].match(/([0-9]*[.])[0-9]+/)[0];

      const nextElmSize =
         +nextElm.style[dimension].match(/([0-9]*[.])[0-9]+/)[0];

      // update elements size
      let newPrevElmSize;
      let newNextElmSize;

      if (
         (prevElm['offset' + capitalize(dimension)] < minSize &&
            movement < 0) ||
         (nextElm['offset' + capitalize(dimension)] < minSize && movement > 0)
      ) {
         // The height remains unchanged
         newPrevElmSize = `calc((100% - 0px) * ${prevElmSize})`;
         newNextElmSize = `calc((100% - 0px) * ${nextElmSize})`;
      } else {
         // calculate new sizes
         newPrevElmSize = `calc((100% - 0px) * ${prevElmSize + changedSize})`;
         newNextElmSize = `calc((100% - 0px) * ${nextElmSize - changedSize})`;
      }

      nextElm.style[dimension] = newNextElmSize;
      prevElm.style[dimension] = newPrevElmSize;
   }

   function handleResize(e) {
      resize(ref, orientation === 'horizontal' ? e.movementX : e.movementY);
   }

   function handleResizeEnd() {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
   }

   function handleResizeStart() {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
   }

   return (
      <StyledResizer
         orientation={orientation}
         onMouseDown={handleResizeStart}
         ref={ref}
      />
   );
};
