import styled from 'styled-components';

const Flex = styled.div`
   display: ${props => (props.inline ? 'inline-flex' : 'flex')};
   flex-direction: ${props => (props.direction ? props.direction : 'row')};
   align-items: ${props => props.alignItems};
   justify-content: ${props => props.justifyContent};
   gap: ${props => props.gap};
`;

export default Flex;
