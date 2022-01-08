import styled from 'styled-components';

export const Input = styled.input`
   width: 100%;
   min-height: 3rem;
   padding: 0 1rem;
   border-radius: 0.25rem;
   background-color: var(--white);
`;

export const SearchInput = styled(Input)`
   z-index: var(--z-10);
   box-shadow: var(--shadow);
`;
