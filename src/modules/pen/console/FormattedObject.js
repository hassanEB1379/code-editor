import { useState } from 'react';
import { StyleByDataType } from './StyleByDataType';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FOExpandButton = styled.span`
   width: 0.5rem;
   cursor: pointer;
`;

const FOItemCount = styled.p`
   display: inline-block;
   opacity: 0.4;
   font-size: 0.9rem;
`;

const FOItemsList = styled.ul`
   margin-left: 1.2rem;
   margin-top: 0.5rem;
   & > li:not(:last-of-type) {
      margin-bottom: 0.3rem;
   }
`;

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
