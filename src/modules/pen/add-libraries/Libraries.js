import { useState } from 'react';
import { useState as useHookState } from '@hookstate/core';
import { penState } from '../states';
import styled from 'styled-components';

import { ModalHeader, ModalContent, ModalBody } from '../../modal';
import { Box, Divider, Text, SearchInput } from '../../../ui';
import { LibraryListItem } from './LibraryListItem';
import { CloseIcon } from '../../../ui/icons/icons';

import { useDebounce } from '../../../hooks/useDebounce';
import { useAddLibrary, useFetchCDNJs } from './Libraries-hooks';
import { useCustomAlert } from '../../alerts/useCustomAlert';

// styled components
const SearchResultList = styled.ul`
   --item-height: 5.5rem;
   position: absolute;
   background-color: var(--white);
   margin-top: -5px;
   padding-top: 5px;
   width: 100%;
   max-height: calc(6 * var(--item-height));
   top: 100%;
   border-radius: 0 0 0.5rem 0.5rem;
   overflow: auto;
   box-shadow: var(--shadow);
`;

const StyledResultItem = styled.li`
   color: var(--black);
   border-bottom: 3px solid var(--primary-light);
   height: var(--item-height); // variable inherites from SearchResultList
   padding: 1rem;
   cursor: pointer;
   &:last-of-type {
      border-radius: 0 0 0.5rem 0.5rem;
      border-bottom: none;
   }
`;

const ClearSearchBox = styled.span`
   // hidden button when there is no search text
   display: ${({ show }) => !show && 'none'};
   padding-right: 1rem;
   position: absolute;
   right: 0;
   top: 50%;
   color: var(--black);
   opacity: 0.4;
   z-index: var(--z-999);
   transform: translateY(-50%);
   cursor: pointer;
`;

// This component render search result item and handle add cdn url to library list
function SearchResultItem({ data, onClick }) {
   return (
      <StyledResultItem onClick={onClick}>
         <Text mb=".5rem" as="h2" weight="800" size="1rem">
            {data.name}{' '}
            <Text as="span" textColor="var(--info)">
               {data.version}
            </Text>
         </Text>
         <Text size="1rem" truncate>
            {data.description}
         </Text>
      </StyledResultItem>
   );
}

function SearchBox() {
   const [searchText, setSearchText] = useState('');

   const debouncedText = useDebounce(searchText, 1000);
   const results = useFetchCDNJs(debouncedText);

   const add = useAddLibrary();

   function clearInput() {
      setSearchText('');
   }

   // render result list if there is valid results
   if (searchText && results && !results.error) {
      var resultList = results.map((result, i) => (
         <SearchResultItem key={i} data={result} onClick={() => add(result)} />
      ));
   }

   return (
      <Box z={1} pos="relative" overflow="visible" className="flex dir-c">
         <SearchInput
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search CDN"
         />

         {/* clear search input button */}
         <ClearSearchBox show={searchText} onClick={clearInput}>
            <CloseIcon size="lg" />
         </ClearSearchBox>

         {/* render results list */}
         <SearchResultList>{resultList}</SearchResultList>
      </Box>
   );
}

function AddedLibraries() {
   const pen = useHookState(penState);

   return (
      <Box mt="2rem" className="flex dir-c gap-1">
         <Text mb=".5rem" size="1.2rem" weight="600">
            List of cdn links{' '}
         </Text>
         <Text fStyle="italic">
            The links are rendered in the order in which they are listed
         </Text>
         <Divider />

         {pen.libraries.map((lib, i) => (
            <LibraryListItem
               length={pen.libraries.get().length}
               index={i}
               key={Math.random() * 10000}
               library={lib}
            />
         ))}
      </Box>
   );
}

// This component ( module ) is for managing libraries added to project
function Libraries() {
   const { showWarningAlert } = useCustomAlert();

   return (
      <ModalContent>
         <ModalHeader
            title="Libraries"
            onModalClose={() => showWarningAlert('Save libraries changes')}
         />

         <ModalBody>
            <Text mb="1rem">
               Add External libraries and packages from CDNjs
            </Text>

            <SearchBox />
            <AddedLibraries />
         </ModalBody>
      </ModalContent>
   );
}

export default Libraries;
