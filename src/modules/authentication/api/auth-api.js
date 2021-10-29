export function AuthApi(data) {
   const loginPromise = new Promise((resolve, _) => {
      setTimeout(() => {
         resolve({ token: Math.floor(Math.random() * 1000000), ...data });
      }, 3000);
   });

   return loginPromise;
}
