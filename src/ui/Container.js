import styled from 'styled-components';
import { Spacing } from './Spacing';

const Container = styled(Spacing).attrs(() => ({
   mx: 'auto',
}))`
   max-width: ${({ maxWidth = '100%' }) => maxWidth};
`;

export { Container };
