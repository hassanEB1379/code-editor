import styled from 'styled-components';

const OutputWrapper = styled.div`
   flex-grow: 1;
   width: 1px;
   position: relative;
`;

const OutputOverlay = styled.div`
   position: absolute;
   inset: 0;
   z-index: 10;
`;

const OutputView = () => {
   return (
      <OutputWrapper>
         <OutputOverlay />

         <iframe
            style={{ backgroundColor: '#fff', border: 'none' }}
            width="100%"
            height="100%"
            title="output-window"
         />
      </OutputWrapper>
   );
};

export default OutputView;
