import styled from 'styled-components';
import { Box, Button, Menu, MenuItem } from '../../../ui';
import { useRef, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Description } from './Fonts';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useCustomAlert } from '../../alerts/useCustomAlert';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Category = styled(Box).attrs(() => ({
   as: Button,
   py: '1.8rem',
   className: 'f-item m4',
}))``;

const ImageList = styled(Box)`
   column-count: 2;
   column-gap: 1rem;

   @media screen and (max-width: 601px) {
      column-count: 1;
   }
`;

const Image = styled.img`
   cursor: pointer;
   margin-top: 1rem;
   width: 100%;
   height: 100%;
   object-fit: contain;
   border-radius: 0.2rem;
`;

const categories = [
   'Nature',
   'Food & Drink',
   'Travel',
   'Animals',
   'Arts & Culture',
   'History',
   'Fashion',
   'Wallpapers',
];

// unsplash api access key and url
const key = 'zXYXV5KoyYvsqVLI2mJvoez1Dd-cK5f3SMqmSOpm3kY';
const url = `https://api.unsplash.com/search/photos/?client_id=${key}`;

function ImageBox({ urls, ...rest }) {
   const ref = useRef();

   const [position, setPosition] = useState(null);

   const { showSuccessAlert } = useCustomAlert();

   // display menu
   function showMenu(e) {
      // update menu position
      setPosition({
         x: e.nativeEvent.offsetX + 'px',
         y: e.nativeEvent.offsetY + 'px',
      });
   }

   // close menu when click outside box
   useOnClickOutside(ref, () => setPosition(null));

   function copyUrl(url) {
      navigator.clipboard
         .writeText(url)
         .then(() => showSuccessAlert('url of image copied to clipboard'));
   }

   return (
      <Box ref={ref} overflow="visible" pos="relative">
         <Image onClick={showMenu} {...rest} />
         {position && (
            <Box
               z="var(--z-999)"
               as={Menu}
               pos="absolute"
               top={position.y}
               left={position.x}
            >
               <MenuItem onClick={() => copyUrl(urls.small)}>Small</MenuItem>
               <MenuItem onClick={() => copyUrl(urls.regular)}>
                  Regular
               </MenuItem>
               <MenuItem onClick={() => copyUrl(urls.full)}>Large</MenuItem>
            </Box>
         )}
      </Box>
   );
}

function ShowCategoryImages({ category, backBtnHandler }) {
   const { data } = useFetch(url + '&query=' + category);

   return (
      <>
         <Button sm onClick={backBtnHandler}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
         </Button>
         <ImageList>
            {data &&
               data.results.map(image => (
                  <ImageBox
                     key={image.id}
                     alt={image.description}
                     src={image.urls.thumb}
                     urls={image.urls}
                  />
               ))}
         </ImageList>
      </>
   );
}

export function Images() {
   const [selectedCategory, setSelectedCategory] = useState(null);

   if (!selectedCategory)
      // render category list
      return (
         <>
            <Description>
               Images provided from{' '}
               <a href="https://unsplash.com" target="_blank">
                  unsplash
               </a>
            </Description>
            <Box mt="1rem" className="flex gap-2 wrap">
               {categories.map((category, index) => (
                  <Category
                     onClick={() => setSelectedCategory(category)}
                     key={index}
                  >
                     {category}
                  </Category>
               ))}
            </Box>
         </>
      );
   // render images from selected category
   else
      return (
         <ShowCategoryImages
            category={selectedCategory}
            backBtnHandler={() => setSelectedCategory(null)}
         />
      );
}
