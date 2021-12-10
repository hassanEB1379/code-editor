import styled from 'styled-components';

// components related to form
const Form = styled.form`
   background-color: var(--dark-bg);
   padding: 1.7rem 1rem;
   border-radius: 0.5rem;
   border: 4px solid var(--form-border);
   display: flex;
   flex-direction: column;
   gap: 1.2rem;
`;

export const FieldGroup = styled.div.attrs(() => ({
   className: 'flex dir-c gap-2',
}))``;

const Field = styled.input`
   padding: 0.3rem;
   border-radius: 0.3rem;
   border: 3px solid var(--field-border);
   font-weight: 600;

   &:focus {
      border: 3px solid var(--field-border-focus);
   }
`;

const Submit = styled.input.attrs(() => ({ type: 'submit' }))`
   cursor: pointer;
   color: inherit;
   font-weight: 600;
   border-radius: 0.3rem;
   padding: 0.5rem;
   width: 100%;
   background-color: var(--form-submit-bg);

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
   }
`;

const ErrorMessage = styled.div`
   display: inline-block;
   color: var(--form-error-text);
   font-size: 0.8rem;
`;

export { Form, Field, Submit, ErrorMessage };
