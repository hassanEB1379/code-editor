import styled from 'styled-components';
import Flex from './Flex';

const Button = styled(Flex).attrs(() => ({
   inline: true,
   alignItems: 'center',
   gap: '.5rem',
}))`
   background-color: var(--dark-btn);
   padding: ${props => (props.dense || props.sm ? '.4rem' : '.8rem 1.2rem')};
   border: none;
   border-radius: 0.3rem;
   cursor: pointer;
   font-size: ${props => (props.sm ? '.7rem' : 'inherit')};
   &:hover {
      background-color: var(--dark-bth-hover);
   }
`;

export default Button;
