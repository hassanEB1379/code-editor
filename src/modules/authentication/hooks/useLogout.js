import { logout, useAuthDataDispatch } from '../contexts/auth-context';

export function useLogout() {
   const dispatch = useAuthDataDispatch();

   return function () {
      dispatch(logout());
   };
}
