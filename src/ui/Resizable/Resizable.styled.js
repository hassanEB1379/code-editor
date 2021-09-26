import styled, { css } from 'styled-components';
import Flex from '../Flex';

const ResizableWrapper = styled(Flex)`
   position: relative;
   width: 100%;
   height: 100%;
   flex-grow: 1;
`;

const ShowSize = styled.span`
   background-color: #c7c9d3;
   color: #444857;
   border-radius: 0.5rem;
   padding: 0.2rem;
   font-size: 0.5rem;
   position: absolute;
   z-index: 100;
   left: 100%;
   top: 50%;
   transform: translate(-75%, -100%);
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

const StyledResizer = styled.div`
   z-index: 999;
   ${({ orientation }) => {
      if (orientation === 'horizontal') {
         return css`
            cursor: col-resize;
            width: 0.5rem;
            height: 100%;
            border-right: 1px solid var(--dark-border);
         `;
      } else {
         return css`
            cursor: row-resize;
            width: 100%;
            height: 0.5rem;
            margin-bottom: -0.5rem;
            border-top: 1px solid var(--dark-border);
         `;
      }
   }}
`;

export { ResizerX, StyledResizer, ShowSize, ResizableWrapper };
