import styled from 'styled-components';
import { Spacing } from './Spacing';

export const Text = styled(Spacing).attrs(({ as = 'p' }) => ({ as }))`
   color: ${({ color }) => color};
   font-size: ${({ size }) => size};
   font-style: ${({ fStyle }) => fStyle};
   font-weight: ${({ weight }) => weight};
   line-height: ${({ lineH }) => lineH};
`;
