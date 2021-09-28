import styled from 'styled-components';
import Flex from './Flex';

const Button = styled(Flex).attrs(() => ({
   inline: true,
   items: 'center',
   gap: '.5rem',
}))`
   background-color: var(--dark-btn);
   border: none;
   border-radius: 0.3rem;
   cursor: pointer;
   font-size: ${props => (props.sm ? '.7rem' : 'inherit')};
   &:hover {
      background-color: var(--dark-bth-hover);
   }

   padding: ${props => {
      if (props.dense || props.sm) {
         return '.4rem';
      } else if (props.wide) {
         return '.8rem 1.8rem';
      } else {
         return '.8rem 1.2rem';
      }
   }};
`;

export default Button;
