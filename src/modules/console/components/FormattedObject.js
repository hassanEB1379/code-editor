import { useState } from 'react';
import { StyleByDataType } from './StyleByDataType';

import {
   FOExpandButton,
   FOItemCount,
   FOItemsList,
} from '../styled/styled-StyleByDataType';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export function FormattedObject({ object, array = false }) {
   const [showItems, setShowItems] = useState(false);

   let objectKeys = Object.keys(object);

   function toggleList() {
      setShowItems(!showItems);
   }

   const ObjectItemsList = objectKeys.map((key, index) => (
      <li key={index}>
         {key} : <StyleByDataType data={object[key]} />
      </li>
   ));

   return (
      <div className="flex inline dir-c">
         <div className="flex items-center gap-2">
            {/* Toggle items list button (show if item exist) */}
            {objectKeys.length !== 0 && (
               <FOExpandButton onClick={toggleList}>
                  <FontAwesomeIcon
                     icon={showItems ? faCaretDown : faCaretRight}
                  />
               </FOExpandButton>
            )}

            {/* display item count between object or array symbol */}
            {array ? '[' : '{'}
            <FOItemCount>{objectKeys.length} item</FOItemCount>
            {array ? ']' : '}'}
         </div>
         {/* object items list */}
         {showItems && <FOItemsList>{ObjectItemsList}</FOItemsList>}
      </div>
   );
}
