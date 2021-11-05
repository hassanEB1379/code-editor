import {
   Button,
   Container,
   Divider,
   Dropdown,
   Flex,
   Spacing,
   Menu,
   MenuItem,
} from '../ui';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCode,
   faEllipsisH,
   faPlus,
   faTrash,
} from '@fortawesome/free-solid-svg-icons';

const WorksWrapper = styled(Spacing)`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-gap: 2.5rem 1.5rem;
`;

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

const WorkBody = styled(Flex).attrs(() => ({
   flexDir: 'column',
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

const WorkInfo = styled(Flex)`
   & > p {
      font-size: 0.9rem;
      font-weight: 700;
   }
`;

const AddNewWorkBtn = styled(Flex)`
   background-color: var(--work-body-bg);
   border-radius: 0.75rem;
   cursor: pointer;
   opacity: 0.7;
   transition: opacity 0.2s ease 0.1s;

   &:hover {
      opacity: 1;
   }

   & > svg {
      color: var(--dark-btn);
   }
`;

function Work({ title, imageSrc, id }) {
   const DropdownToggleButton = (
      <Button sm title="Actions">
         <FontAwesomeIcon icon={faEllipsisH} />
      </Button>
   );

   const DropdownContent = (
      <Menu>
         <MenuItem>
            <FontAwesomeIcon style={{ marginRight: '.75rem' }} icon={faCode} />
            Edit
         </MenuItem>
         <MenuItem>
            <FontAwesomeIcon style={{ marginRight: '.75rem' }} icon={faTrash} />
            Delete
         </MenuItem>
      </Menu>
   );

   return (
      <WorkBody p=".75rem">
         <WorkLink to={`pen/${id}`}>
            <img alt={title} src={imageSrc} />
         </WorkLink>

         <WorkInfo px=".5rem" mt=".75rem" justify="space-between">
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

   function handleAddNewWork() {
      // create new id
      const id = Math.floor(Math.random() * 1000000);

      // create new pen and store it
      let prevPens = JSON.parse(localStorage.getItem('pens')) || [];

      localStorage.setItem(
         'pens',
         JSON.stringify([
            ...prevPens,
            {
               id,
               title: 'Untitled',
               image: 'https://cdn.pixabay.com/photo/2021/10/18/08/39/pumpkin-6720424_960_720.jpg',
               code: { html: '', css: '', js: '' },
            },
         ])
      );

      // redirect to new pen
      return history.push(`/pen/${id}`);
   }

   return (
      <AddNewWorkBtn
         onClick={handleAddNewWork}
         title="Create new pen"
         items="center"
         justify="center"
      >
         <FontAwesomeIcon size="4x" icon={faPlus} />
      </AddNewWorkBtn>
   );
}

function MyWorks() {
   const works = JSON.parse(localStorage.getItem('pens'));

   return (
      <Container maxWidth="70rem" p="4rem 1rem">
         <h1>My works</h1>
         <Divider />
         <WorksWrapper pt="3rem">
            {works &&
               works.map(work => (
                  <Work
                     key={work.id}
                     id={work.id}
                     title={work.title}
                     imageSrc={work.image}
                  />
               ))}

            <AddNewWork />
         </WorksWrapper>
      </Container>
   );
}

export default MyWorks;
