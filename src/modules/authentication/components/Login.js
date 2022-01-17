import {
   Field,
   Form,
   Submit,
   ErrorMessage,
   Container,
   FieldGroup,
   Divider,
} from '../../../ui';
import { useState } from '@hookstate/core';
import { authState } from '../states';
import { authApi } from '../api/auth-api';
import { useForm } from 'react-hook-form';

// messages
import { REQUIRED_FIELD, SAFE_PASSWORD, VALID_EMAIL } from '../utils/constants';

export function Login() {
   const auth = useState(authState);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   function onSubmit(data) {
      auth.set(authApi(data));
   }

   return (
      <Container pt="5rem" maxWidth="24rem">
         <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>

            <Divider />

            <FieldGroup>
               <label htmlFor="email-field">Email</label>

               <Field
                  {...register('email', {
                     required: true,
                     pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  })}
                  id="email-field"
                  autoComplete="off"
               />

               <ErrorMessage>
                  {errors?.email?.type === 'pattern' && VALID_EMAIL}
                  {errors?.email?.type === 'required' && REQUIRED_FIELD}
               </ErrorMessage>
            </FieldGroup>

            <FieldGroup>
               <label htmlFor="password-field">Password</label>

               <Field
                  {...register('password', {
                     required: true,
                     pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  })}
                  id="password-field"
                  type="password"
                  autoComplete="off"
               />

               <ErrorMessage>
                  {errors?.password?.type === 'pattern' && SAFE_PASSWORD}
                  {errors?.password?.type === 'required' && REQUIRED_FIELD}
               </ErrorMessage>
            </FieldGroup>

            <Submit value="Submit" />
         </Form>
      </Container>
   );
}
