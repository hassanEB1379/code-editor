import { AuthApi } from '../api/auth-api';
import {
   loading,
   success,
   useAuthDataDispatch,
} from '../contexts/auth-context';

export function useAuthentication() {
   const dispatch = useAuthDataDispatch();

   return function (userData) {
      dispatch(loading());
      AuthApi(userData).then(res => {
         dispatch(success(res));
      });
   };
}
