import styled from 'styled-components';

// components related to form
const Form = styled.form`
   background-color: var(--primary);
   padding: 1.7rem 1rem;
   border-radius: 2px;
   border: var(--border);
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
`;

export const FieldGroup = styled.div.attrs(() => ({
   className: 'flex dir-c gap-2',
}))``;

const Field = styled.input`
   padding: 0.3rem;
   font-weight: 600;
`;

const Submit = styled.input.attrs(() => ({ type: 'submit' }))`
   cursor: pointer;
   color: inherit;
   font-weight: 600;
   border-radius: 0.3rem;
   padding: 0.5rem;
   width: 100%;
   background-color: var(--secondary);
`;

const ErrorMessage = styled.div`
   display: inline-block;
   color: var(--error);
   font-size: 0.9rem;
`;

export { Form, Field, Submit, ErrorMessage };
