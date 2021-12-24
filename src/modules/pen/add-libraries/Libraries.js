import { ModalContent } from '../../modal/styled-modal';
import ModalHeader from '../../modal/ModalHeader';
import { Box, Divider, Text } from '../../../ui';
import { SearchInput } from '../../../ui/Input';
import styled from 'styled-components';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAddLibrary, useFetchCDNJs } from './Libraries-hooks';
import { usePen } from '../contexts/pen-context';
import { CloseIcon } from '../../../icons/icons';
import { LibraryListItem } from './LibraryListItem';
import { useCustomAlert } from '../../alerts/useCustomAlert';

// styled components
const SearchResultList = styled.ul`
   position: absolute;
   background-color: var(--white);
   margin-top: -5px;
   padding-top: 5px;
   width: 100%;
   top: 100%;
   border-radius: 0 0 0.5rem 0.5rem;
   max-height: 20rem;
   overflow: auto;
   box-shadow: var(--shadow);
`;

const StyledResultItem = styled.li`
   color: var(--black);
   border-bottom: 3px solid var(--text-disabled);
   height: 5rem;
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
         <Text as="h4">
            {data.name}{' '}
            <Text as="span" textColor="var(--info)">
               {data.version}
            </Text>
         </Text>
         <Text truncate>{data.description}</Text>
      </StyledResultItem>
   );
}

function SearchBox() {
   const [searchText, setSearchText] = useState('');

   const debouncedText = useDebounce(searchText, 1000);
   const results = useFetchCDNJs(debouncedText);

   // add library to pen context when click on item
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
   const { libraries } = usePen();

   return (
      <Box mt="2rem" className="flex dir-c gap-1">
         <Text weight="600">List of cdn links </Text>
         <Text fStyle="italic" size=".9rem">
            The links are rendered in the order in which they are listed
         </Text>
         <Divider />

         {libraries.map((lib, i) => (
            <LibraryListItem
               length={libraries.length}
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
         {/* Modal body */}
         <Box h="26rem" px=".5rem">
            <Text as="h3" mb="1rem" size="1rem">
               Add External libraries and packages from CDNjs
            </Text>

            <SearchBox />
            <AddedLibraries />
         </Box>
      </ModalContent>
   );
}

export default Libraries;
