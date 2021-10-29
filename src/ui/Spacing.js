import styled, { css } from 'styled-components';

export const Spacing = styled.div`
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
