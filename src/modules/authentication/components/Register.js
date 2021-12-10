import {
   ErrorMessage,
   Field,
   Form,
   Submit,
   Divider,
   Container,
   FieldGroup,
} from '../../../ui';

import { useForm } from 'react-hook-form';
import { useAuthentication } from '../hooks/useAuthentication';

// messages
import { REQUIRED_FIELD, SAFE_PASSWORD, VALID_EMAIL } from '../utils/constants';

export function Register() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const authentication = useAuthentication();

   function onSubmit(data) {
      authentication(data);
   }

   return (
      <Container pt="5rem" maxWidth="24rem">
         <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>

            <Divider />

            <FieldGroup>
               <label htmlFor="username-field">Username</label>

               <Field
                  {...register('username', { required: true })}
                  id="username-field"
                  autoComplete="off"
               />

               <ErrorMessage>
                  {errors.username?.type === 'required' && REQUIRED_FIELD}
               </ErrorMessage>
            </FieldGroup>

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
                  {errors.email?.type === 'required' && REQUIRED_FIELD}
                  {errors.email?.type === 'pattern' && VALID_EMAIL}
               </ErrorMessage>
            </FieldGroup>

            <FieldGroup>
               <label htmlFor="password-field">Password</label>

               <Field
                  {...register('password', {
                     required: true,
                     pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  })}
                  type="password"
                  id="password-field"
                  autoComplete="off"
               />

               <ErrorMessage>
                  {errors.password?.type === 'required' && REQUIRED_FIELD}
                  {errors.password?.type === 'pattern' && SAFE_PASSWORD}
               </ErrorMessage>
            </FieldGroup>

            <Submit value="Submit" />
         </Form>
      </Container>
   );
}
