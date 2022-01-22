import { Box } from '../../../ui';
import styled from 'styled-components';
import Editor from '../components/Editor';
import { useState } from '@hookstate/core';
import { penState } from '../states';

import htmlIcon from '../../../ui/images/html.svg';
import cssIcon from '../../../ui/images/css.svg';
import jsIcon from '../../../ui/images/javascript.svg';

const Tab = styled.div`
   --icon-width: 18px;
   --icon-edge-distance: 5px;
   --indicator: 3px;
   position: relative;
   cursor: pointer;
   flex-grow: 1;
   background-color: var(--primary);
   padding-top: calc(0.5rem + var(--indicator));
   padding-bottom: 0.5rem;
   padding-left: calc(var(--icon-width) + var(--icon-edge-distance) + 5px);

   border-bottom: ${({ active }) =>
      active
         ? 'var(--indicator) solid var(--secondary)'
         : 'var(--indicator) solid transparent'};

   &::before {
      content: url(${({ icon }) => icon});
      position: absolute;
      left: var(--icon-edge-distance);
      width: var(--icon-width);
   }
`;

export function TabModeEditors() {
   const pen = useState(penState);

   const activeEditor = useState('html');

   const getTabProps = (lang, icon) => ({
      onClick: () => activeEditor.set(lang),
      active: activeEditor.get() === lang,
      icon,
   });

   return (
      <Box className="flex dir-c">
         <Box className="flex">
            <Tab {...getTabProps('html', htmlIcon)}>HTML</Tab>
            <Tab {...getTabProps('css', cssIcon)}>CSS</Tab>
            <Tab {...getTabProps('javascript', jsIcon)}>JS</Tab>
         </Box>

         <Editor
            options={{
               mode: activeEditor.get(),
               name: activeEditor.get() + '-editor',
               value: pen.code.get()[activeEditor.get()],
            }}
         />
      </Box>
   );
}
