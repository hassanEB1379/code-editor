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
   position: relative;

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

const ImageMenu = styled(Box).attrs(({ position }) => ({
   as: Menu,
   z: 'var(--z-999)',
   pos: 'absolute',
   maxW: '10rem',
   style: {
      top: position?.y,
      left: position?.x,
   },
}))`
   display: ${({ position }) => (position ? 'revert' : 'none')};
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

// unsplash api access key and url ( this api only work with vpn in iran )
const key = 'zXYXV5KoyYvsqVLI2mJvoez1Dd-cK5f3SMqmSOpm3kY';
const url = `https://api.unsplash.com/search/photos/?client_id=${key}`;

// This component render image thumbnail and action menu
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

         <ImageMenu position={position}>
            <MenuItem onClick={() => copyUrl(urls.small)}>Small</MenuItem>
            <MenuItem onClick={() => copyUrl(urls.regular)}>Regular</MenuItem>
            <MenuItem onClick={() => copyUrl(urls.large)}>Large</MenuItem>
         </ImageMenu>
      </Box>
   );
}

// This component fetch image from api and display its
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

/*
 *  This component render categories if no selected category and
 *  display image list if category is selected
 * */
export function Images() {
   const [selectedCategory, setSelectedCategory] = useState(null);

   if (!selectedCategory)
      // render category list
      return (
         <>
            <Description>
               Images provided from{' '}
               <a href="https://unsplash.com" target="_blank" rel="noreferrer">
                  unsplash
               </a>
               <br />
               <span>*Note : please turn on vpn for using</span>
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
   // render image list
   else
      return (
         <ShowCategoryImages
            category={selectedCategory}
            backBtnHandler={() => setSelectedCategory(null)}
         />
      );
}
