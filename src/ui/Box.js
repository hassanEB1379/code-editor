import styled, { css } from 'styled-components';
// This component handle width , height , border , padding and margin and ...
export const Box = styled.div`
   position: ${({ pos }) => pos};
   top: ${({ top }) => top};
   left: ${({ left }) => left};
   z-index: ${({ z }) => z};

   height: ${({ h }) => h};
   width: ${({ w }) => w};
   max-height: ${({ maxH }) => maxH};
   max-width: ${({ maxW }) => maxW};
   overflow: ${({ overflow = 'auto' }) => overflow};

   border: ${({ border }) => border};
   border-top: ${({ borderT }) => borderT};
   border-bottom: ${({ borderB }) => borderB};
   border-right: ${({ borderR }) => borderR};
   border-left: ${({ borderL }) => borderL};
   border-radius: ${({ round }) => round};

   margin: ${({ m, mx, my }) => {
      return m
         ? m
         : css`
              ${my || 0} ${mx || 0}
           `;
   }};

   margin-top: ${({ mt }) => mt};
   margin-bottom: ${({ mb }) => mb};
   margin-right: ${({ mr }) => mr};
   margin-left: ${({ ml }) => ml};

   padding: ${({ p, px, py }) => {
      return p
         ? p
         : css`
              ${py || 0} ${px || 0}
           `;
   }};

   padding-top: ${({ pt }) => pt};
   padding-bottom: ${({ pb }) => pb};
   padding-right: ${({ pr }) => pr};
   padding-left: ${({ pl }) => pl};
`;
