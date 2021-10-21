import { useEffect, useState } from 'react';

export function useFullscreen() {
   const [isFullscreen, setIsFullscreen] = useState(false);

   function toggleFullScreen() {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
         document.exitFullscreen();
      }
   }

   useEffect(() => {
      function handler() {
         if (window.innerHeight === window.screen.height) {
            setIsFullscreen(true);
         } else {
            setIsFullscreen(false);
         }
      }

      window.addEventListener('resize', handler);

      return () => {
         window.removeEventListener('resize', handler);
      };
   }, []);

   return { toggleFullScreen, isFullscreen };
}
