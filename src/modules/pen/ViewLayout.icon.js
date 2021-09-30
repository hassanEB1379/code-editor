import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
   transform: rotate(${props => props.rotate}deg);
`;

function ViewLayoutIcon({ rotate = 0 }) {
   return (
      <SvgIcon
         fill="#fff"
         width="15px"
         height="15px"
         viewBox="0 0 33 33"
         rotate={rotate}
      >
         <g>
            <g>
               <rect y="12" width="33" height="21" />
               <rect x="12" width="9" height="9" />
               <rect x="24" width="9" height="9" />
               <rect width="9" height="9" />
            </g>
         </g>
      </SvgIcon>
   );
}

export default ViewLayoutIcon;
