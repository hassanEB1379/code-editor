export function authApi(data) {
   return new Promise((resolve, _) => {
      setTimeout(() => {
         resolve({ isAuthenticated: true, ...data });
      }, 3000);
   });
}
