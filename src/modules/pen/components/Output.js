import styled from 'styled-components';
import { useSourceUrl } from '../contexts/source-url-context';
import { useHandleIframeMessages } from '../hooks/useHandleIframeMessages';

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
   // generated document url ( using in src attribute )
   const url = useSourceUrl();

   useHandleIframeMessages();

   return (
      <OutputWrapper>
         <Iframe
            src={url}
            title="output-window"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
         />
      </OutputWrapper>
   );
};

export default Output;
