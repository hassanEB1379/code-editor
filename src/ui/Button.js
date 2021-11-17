import styled from 'styled-components';

export const Button = styled.button`
   position: relative;
   overflow: hidden;
   display: inline-flex;
   align-items: center;
   gap: 0.5rem;
   background-color: var(--dark-btn);
   border-radius: 0.3rem;
   font-size: ${props => (props.sm ? '.7rem' : 'inherit')};
   &:hover {
      background-color: var(--dark-bth-hover);
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
