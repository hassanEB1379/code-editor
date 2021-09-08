import styled from 'styled-components';

const ResizableWrapper = styled.div`
   position: relative;
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

export { ResizerX, ShowSize, ResizableWrapper };
