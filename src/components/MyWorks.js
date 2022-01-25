import {
   Container,
   Divider,
   Dropdown,
   Spacing,
   Menu,
   MenuItem,
   Box,
   Text,
   SimpleButton,
} from '../ui';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useCustomAlert } from '../modules/alerts/useCustomAlert';

import workImage from '../ui/images/pumpkin.webp';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCode,
   faCopy,
   faEllipsisH,
   faPlus,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';

// dexie
import { db } from '../indexedDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { createID } from '../utils/createID';

// initial pen template
const initialPen = {
   title: 'Untitled',
   code: { html: '', css: '', js: '' },
   libraries: [],
};

// styles
const WorkLink = styled(Link)`
   & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
   overflow: hidden;
   border-radius: 0.5rem;
   margin-top: -1.5rem;
`;

const WorkBody = styled(Spacing).attrs(() => ({
   className: 'flex dir-c',
   p: '.75rem',
}))`
   background-color: var(--primary);
   border-radius: 0.75rem;
   position: relative;

   // handle hover animation
   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: 0.75rem;
      background-color: var(--primary);
      transition: top 0.2s ease 0.1s;
   }

   &:hover::before {
      top: -1.5rem;
   }
`;

const WorkInfo = styled(Spacing).attrs(() => ({
   className: 'flex justify-between',
   px: '.5rem',
   mt: '.75rem',
}))`
   & > p {
      font-size: 0.9rem;
      font-weight: 700;
   }
`;

const AddNewWorkBtn = styled.div.attrs(() => ({
   className: 'flex items-center justify-center',
}))`
   background-color: var(--primary);
   border-radius: 0.75rem;
   cursor: pointer;
   opacity: 0.7;
   transition: opacity 0.2s ease 0.1s;
   height: 100%;
   &:hover {
      opacity: 1;
   }

   & > svg {
      color: var(--primary-light);
   }
`;

/*
 * this hook creates pen if id not passed
 * and duplicate pen if its id passed to hook
 */
function useAddWork(id) {
   const { showErrorAlert } = useCustomAlert();
   const history = useHistory();

   return async function () {
      let pen = {};
      let newID = createID();

      try {
         if (id) {
            pen = await db.pens.get(id);
            pen.title = pen.title + '(copy)';
         } else {
            pen = Object.assign(pen, initialPen);
         }

         pen.id = newID;

         await db.pens.add(pen);

         return history.push(`/pen/${newID}`);
      } catch (e) {
         return showErrorAlert('Duplicate failed');
      }
   };
}

function Work({ title, imageSrc, id }) {
   const { showSuccessAlert } = useCustomAlert();

   const duplicate = useAddWork(id);

   async function deleteWork() {
      await db.pens.delete(id);
      showSuccessAlert('Pen successfully deleted');
   }

   const DropdownToggleButton = (
      <SimpleButton sm title="Actions">
         <FontAwesomeIcon icon={faEllipsisH} />
      </SimpleButton>
   );

   const DropdownContent = (
      <Menu>
         <MenuItem icon={faCopy} onClick={duplicate}>
            Duplicate
         </MenuItem>

         <MenuItem as={Link} to={`/pen/${id}`} icon={faCode}>
            Edit
         </MenuItem>

         <MenuItem icon={faTrash} onClick={deleteWork}>
            Delete
         </MenuItem>
      </Menu>
   );

   return (
      <WorkBody>
         <WorkLink to={`pen/${id}`}>
            <img alt={title} src={imageSrc} />
         </WorkLink>

         <WorkInfo>
            <Text as="h2">{title}</Text>

            <Dropdown openFrom="left" action={DropdownToggleButton}>
               {DropdownContent}
            </Dropdown>
         </WorkInfo>
      </WorkBody>
   );
}

function AddNewWork() {
   const add = useAddWork();

   return (
      <AddNewWorkBtn onClick={add} title="Create new pen">
         <FontAwesomeIcon size="4x" icon={faPlus} />
      </AddNewWorkBtn>
   );
}

function MyWorks() {
   // Get all works from IDB
   const works = useLiveQuery(() => db.pens.toArray(), []);

   return (
      <Container maxWidth="70rem" p="4rem 1rem">
         <Text as="h1" size="3rem">
            My works
         </Text>
         <Divider />
         <Box py="3rem" className="flex wrap gap-3 gap-y-8">
            {works &&
               works.map(work => (
                  <div key={work.id} className="f-item m6 l4">
                     <Work
                        id={work.id}
                        title={work.title}
                        imageSrc={workImage}
                     />
                  </div>
               ))}

            <Box minH="12rem" className="f-item m6 l4">
               <AddNewWork />
            </Box>
         </Box>
      </Container>
   );
}

export default MyWorks;
