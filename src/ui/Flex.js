import styled from 'styled-components';
import Spacing from './Spacing';

const Flex = styled(Spacing)`
   display: ${props => (props.inline ? 'inline-flex' : 'flex')};
   flex-direction: ${props => props.flexDir ?? 'row'};
   align-items: ${props => props.items};
   justify-content: ${props => props.justify};
   gap: ${props => props.gap};
`;

export default Flex;
