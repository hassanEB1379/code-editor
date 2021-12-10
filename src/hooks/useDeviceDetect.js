import { useCallback, useEffect, useState } from 'react';

export function useDeviceDetect() {
   const [isDesktop, setIsDesktop] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   const detectDevice = useCallback(() => {
      if (window.innerWidth > 601) {
         setIsDesktop(true);
         setIsMobile(false);
      } else {
         setIsMobile(true);
         setIsDesktop(false);
      }
   }, []);

   useEffect(() => {
      detectDevice();
      window.addEventListener('resize', detectDevice);
      return () => window.removeEventListener('resize', detectDevice);
   }, [detectDevice]);

   return { isDesktop, isMobile };
}
