import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext(null);
const AuthContextDispatch = createContext(null);

export const useAuthData = () => useContext(AuthContext);
export const useAuthDataDispatch = () => useContext(AuthContextDispatch);

const basicState = {
   status: 'idle',
   isAuthenticated: false,
   data: {},
};

const initialState = JSON.parse(localStorage.getItem('user')) || basicState;

function authDataReducer(state, action) {
   switch (action.type) {
      case 'loading':
         return {
            ...state,
            status: 'loading',
         };
      case 'error':
         return {
            ...state,
            status: 'error',
         };
      case 'success':
         return {
            status: 'success',
            isAuthenticated: true,
            data: action.payload,
         };
      case 'logout':
         return basicState;
      default:
         throw new Error('unexpected type');
   }
}

export function AuthDataProvider({ children }) {
   const [data, dispatch] = useReducer(authDataReducer, initialState);

   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(data));
   }, [data]);

   return (
      <AuthContext.Provider value={data}>
         <AuthContextDispatch.Provider value={dispatch}>
            {children}
         </AuthContextDispatch.Provider>
      </AuthContext.Provider>
   );
}

// actions
export function loading() {
   return { type: 'loading' };
}

export function error() {
   return { type: 'error' };
}

export function success(payload) {
   return { type: 'success', payload };
}

export function logout(payload) {
   return { type: 'logout', payload };
}
