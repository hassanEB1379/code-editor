import { ResizableWrapper } from './Resizable.styled';
import { Children, useMemo } from 'react';
import { Resizer } from './Resizer';

const Resizable = ({ children, orientation = 'horizontal', minSize }) => {
   // calculate initial size
   const initialSize = useMemo(() => {
      const coefficient = 1 / children.length;

      const dimension = orientation === 'horizontal' ? 'width' : 'height';

      return {
         [dimension]: `calc((100% - 0px) * ${coefficient})`,
      };
   }, [children.length]);

   return (
      <ResizableWrapper direction={orientation === 'vertical' && 'column'}>
         {Children.map(children, (child, index) => {
            return (
               <>
                  <div style={{ ...initialSize }}>{child}</div>

                  {index !== children.length - 1 && (
                     <Resizer orientation={orientation} minSize={minSize} />
                  )}
               </>
            );
         })}
      </ResizableWrapper>
   );
};

export default Resizable;
