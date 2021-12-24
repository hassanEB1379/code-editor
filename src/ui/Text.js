import styled from 'styled-components';
import { Spacing } from './Spacing';

export const Text = styled(Spacing).attrs(({ as = 'p' }) => ({ as }))`
   color: ${({ textColor }) => textColor};
   font-size: ${({ size }) => size};
   font-style: ${({ fStyle }) => fStyle};
   font-weight: ${({ weight }) => weight};
   line-height: ${({ lineH }) => lineH};
   text-transform: ${({ textTransform }) => textTransform};
   ${({ truncate }) =>
      truncate &&
      `
      overflow : hidden;
      text-overflow : ellipsis;
      white-space: nowrap;
    `}
`;
