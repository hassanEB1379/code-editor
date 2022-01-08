import styled from 'styled-components';

export const Button = styled.button`
   position: relative;
   overflow: hidden;
   background-color: var(--secondary);
   border-radius: 0.2rem;
   font-size: ${props => (props.sm ? '.8rem' : 'inherit')};
   &:hover {
      background-color: var(--secondary-dark);
   }

   &:focus {
      outline: 0;
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

export const SimpleButton = styled.button`
   color: var(--white);
   opacity: 0.5;
   &:hover {
      opacity: 1;
   }
`;
