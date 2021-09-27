import styled from 'styled-components';
import Flex from './ui/Flex';
import Button from './ui/Button';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ConsoleTitle = styled.p`
   background-color: var(--tab-bg);
   height: 100%;
   font-size: 0.9rem;
   font-weight: 600;
   color: var(--text-disabled);
`;

const ConsoleBody = styled(Flex).attrs(() => ({
   direction: 'column',
}))`
   background-color: var(--tab-bg);
   flex-grow: 1;
`;

function Console() {
   return (
      <Flex style={{ height: '100%' }} direction="column">
         {/* Console header */}
         <Flex justify="space-between" items="center">
            <ConsoleTitle>Console</ConsoleTitle>

            <Flex inline gap=".3rem">
               <Button sm>Clear</Button>{' '}
               <Button sm>
                  <FontAwesomeIcon icon={faTimes} />
               </Button>
            </Flex>
         </Flex>

         <ConsoleBody />
      </Flex>
   );
}

export default Console;
