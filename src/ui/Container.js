import styled from 'styled-components';
import Spacing from './Spacing';

const Container = styled(Spacing)`
   max-width: ${({ maxWidth = '100%' }) => maxWidth};
   margin: 0 auto;
`;

export { Container };
