import styled from 'styled-components';
import { useHandleIframeMessages } from '../hooks/useHandleIframeMessages';
import { useState } from '@hookstate/core';
import { sourceUrlState } from '../states';

const OutputWrapper = styled.div`
   flex-grow: 1;
   height: 100%;
   position: relative;
`;

const Iframe = styled.iframe`
   background-color: var(--primary-dark);
   border: none;
   width: 100%;
   height: 100%;
`;

const Output = () => {
   const sourceUrl = useState(sourceUrlState);

   useHandleIframeMessages();

   return (
      <OutputWrapper>
         <Iframe
            src={sourceUrl.get()}
            title="output-window"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
         />
      </OutputWrapper>
   );
};

export default Output;
