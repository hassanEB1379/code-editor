import { useEffect } from 'react';

export function ChangeFontSize({ size }) {
   useEffect(() => {
      document.documentElement.style.setProperty(
         '--static-font-size',
         size.get()
      );
   }, [size.get()]);

   return (
      <>
         <label>Font size</label>
         <select
            name="font-size"
            id="font-size"
            value={size.get()}
            onChange={e => size.set(e.target.value)}
         >
            <option value="6px">50%</option>
            <option value="7px">75%</option>
            <option value="8px">100%</option>
            <option value="9px">125%</option>
            <option value="10px">150%</option>
         </select>
      </>
   );
}
