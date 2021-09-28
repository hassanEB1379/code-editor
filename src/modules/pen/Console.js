import styled from 'styled-components';
import Flex from '../../ui/Flex';
import Button from '../../ui/Button';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToggleConsole } from './Console.context';

const ConsoleTitle = styled.p`
   background-color: var(--tab-bg);
   height: 100%;
   font-size: 0.9rem;
   font-weight: 600;
   color: var(--text-disabled);
   padding: 0.3rem 1rem 0.6rem;
   border-top: 0.3rem solid var(--tab-indicator);
`;

const ConsoleBody = styled(Flex).attrs(() => ({
   flexDir: 'column',
}))`
   background-color: var(--tab-bg);
   flex-grow: 1;
`;

function Console() {
   const { toggle } = useToggleConsole();

   return (
      <Flex style={{ height: '100%' }} flexDir="column">
         {/* Console header */}
         <Flex justify="space-between" items="center">
            <ConsoleTitle>Console</ConsoleTitle>

            <Flex inline gap=".3rem" mr=".5rem">
               <Button sm>Clear</Button>

               <Button sm onClick={toggle}>
                  <FontAwesomeIcon icon={faTimes} />
               </Button>
            </Flex>
         </Flex>

         <ConsoleBody />
      </Flex>
   );
}

export default Console;
