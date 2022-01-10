import { useState } from '@hookstate/core';
import { authState, basicState } from '../states';

export function useLogout() {
   const auth = useState(authState);

   return function () {
      auth.set(basicState);
   };
}
