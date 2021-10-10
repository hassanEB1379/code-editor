import { ResizableWrapper } from './Resizable.styled';
import { Children, Fragment, useMemo } from 'react';
import { Resizer } from './Resizer';

const Resizable = ({ children, orientation = 'horizontal', minSize = 20 }) => {
   const validElements = Children.toArray(children);

   // calculate initial size
   const initialSize = useMemo(() => {
      const coefficient = 1 / validElements.length;

      const dimension = orientation === 'horizontal' ? 'width' : 'height';

      return {
         [dimension]: `calc((100% - 0px) * ${coefficient})`,
      };
   }, [validElements, orientation]);

   return (
      <ResizableWrapper flexDir={orientation === 'vertical' && 'column'}>
         {validElements.map((element, index) => (
            <Fragment key={index}>
               <div style={{ ...initialSize }}>{element}</div>

               {index !== validElements.length - 1 && (
                  <Resizer orientation={orientation} minSize={minSize} />
               )}
            </Fragment>
         ))}
      </ResizableWrapper>
   );
};

export default Resizable;
