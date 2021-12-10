import styled from 'styled-components';

export const Group = styled.div.attrs(props => ({
   spaceY: props.spaceY || 0,
   spaceX: props.spaceX || 0,
}))`
   & > * {
      margin: ${props => props.spaceY}rem ${props => props.spaceX}rem;
   }
   margin: -${props => props.spaceY}rem -${props => props.spaceX}rem;
`;
