import styled from 'styled-components';

const Spacing = styled.div`
   margin: ${({ m }) => m};
   margin-top: ${({ mt }) => mt};
   margin-bottom: ${({ mb }) => mb};
   margin-right: ${({ mr }) => mr};
   margin-left: ${({ ml }) => ml};

   padding: ${({ p }) => p};
   padding-top: ${({ pt }) => pt};
   padding-bottom: ${({ pb }) => pb};
   padding-right: ${({ pr }) => pr};
   padding-left: ${({ pl }) => pl};
`;

export default Spacing;
