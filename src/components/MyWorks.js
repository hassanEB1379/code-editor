import {
   Button,
   Container,
   Divider,
   Dropdown,
   Spacing,
   Menu,
   MenuItem,
   Box,
} from '../ui';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useCustomAlert } from '../modules/alerts/useCustomAlert';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCode,
   faEllipsisH,
   faPlus,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';

// dexie
import { db } from '../indexedDB';
import { initialPen } from '../modules/pen/contexts/pen-context';
import { useLiveQuery } from 'dexie-react-hooks';

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
   background-color: var(--work-body-bg);
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
      background-color: var(--work-body-bg);
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
   background-color: var(--work-body-bg);
   border-radius: 0.75rem;
   cursor: pointer;
   opacity: 0.7;
   transition: opacity 0.2s ease 0.1s;
   height: 100%;
   &:hover {
      opacity: 1;
   }

   & > svg {
      color: var(--dark-btn);
   }
`;

function Work({ title, imageSrc, id }) {
   const { showSuccessAlert } = useCustomAlert();

   async function deleteWork() {
      await db.pens.delete(id);
      showSuccessAlert('Pen successfully deleted');
   }

   const DropdownToggleButton = (
      <Button sm title="Actions">
         <FontAwesomeIcon icon={faEllipsisH} />
      </Button>
   );

   const DropdownContent = (
      <Menu>
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
            <p>{title}</p>

            <Dropdown openFrom="left" action={DropdownToggleButton}>
               {DropdownContent}
            </Dropdown>
         </WorkInfo>
      </WorkBody>
   );
}

function AddNewWork() {
   const history = useHistory();

   async function handleAddNewWork() {
      // create new id
      const id = Math.floor(Math.random() * 1000000);

      // add new pen
      await db.pens.add({ id, ...initialPen });

      // redirect to new pen
      return history.push(`/pen/${id}`);
   }

   return (
      <AddNewWorkBtn onClick={handleAddNewWork} title="Create new pen">
         <FontAwesomeIcon size="4x" icon={faPlus} />
      </AddNewWorkBtn>
   );
}

function MyWorks() {
   // Get all works from IDB
   const works = useLiveQuery(() => db.pens.toArray(), []);

   return (
      <Container maxWidth="70rem" p="4rem 1rem">
         <h1>My works</h1>
         <Divider />
         <Box py="3rem" className="flex wrap gap-3 gap-y-8">
            {works &&
               works.map(work => (
                  <div key={work.id} className="f-item m6 l4">
                     <Work
                        id={work.id}
                        title={work.title}
                        imageSrc={work.image}
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
