import styled from 'styled-components';
import Button from './Button';
import Group from './Group';

const HeaderWrapper = styled.div`
   height: 4rem;
   padding: 0.5rem 1rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: var(--dark-bg);
   border-bottom: 1px solid var(--dark-border);
`;

const Header = () => {
   return (
      <HeaderWrapper>
         <Button>hi , i am Button</Button>

         <Group spaceX={0.5}>
            <Button>Settings</Button>
            <Button>Settings</Button>
            <Button>Settings</Button>
            <Button>Settings</Button>
         </Group>
      </HeaderWrapper>
   );
};

export default Header;
