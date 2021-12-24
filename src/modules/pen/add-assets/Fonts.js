import styled from 'styled-components';
import { Spacing } from '../../../ui';
import { useCustomAlert } from '../../alerts/useCustomAlert';

const DisplayFont = styled(Spacing).attrs(() => ({
   as: 'li',
   p: '.25rem .5rem',
}))`
   background-color: var(--dark-btn);
   border-radius: 0.2rem;
   cursor: pointer;
   line-height: 1.8;

   &:nth-child(2n + 1) {
      background-color: transparent;
   }
   & > * {
      font-family: '${({ font }) => font}';
   }
`;

export const Description = styled.p`
   font-style: italic;
   font-size: 0.9rem;
   padding-bottom: 0.5rem;
   line-height: 1.8;

   & > a {
      color: var(--info);
   }
`;

// provided fonts url (google font)
const fonts = {
   'Open Sans':
      'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
   Montserrat:
      'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
   Lato: 'https://fonts.googleapis.com/css2?family=Lato&display=swap',
   Roboto: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
   Outfit: 'https://fonts.googleapis.com/css2?family=Outfit&display=swap',
   Nunito: 'https://fonts.googleapis.com/css2?family=Nunito&display=swap',
};

// This component provide some popular google fonts for use in pen
function Fonts() {
   const { showSuccessAlert } = useCustomAlert();

   function copyToClipboard(font) {
      let importString = '@import url(' + font + ');';
      navigator.clipboard.writeText(importString).then(() => {
         showSuccessAlert('@import expression copied to clipboard');
      });
   }

   return (
      <ul className="flex dir-c gap-3">
         <Description>
            Some popular font provided from{' '}
            <a target="_blank" rel="noreferrer" href="https://fonts.google.com">
               Google fonts
            </a>
         </Description>

         {Object.keys(fonts).map((font, index) => (
            <DisplayFont
               onClick={() => copyToClipboard(fonts[font])}
               key={index}
               font={font}
            >
               {/* declare font */}
               <style>{`@import url(${fonts[font]});`}</style>

               {/* show font demo */}
               <h2>{font}</h2>
               <p>Lorem ipsum dolor sit amet, consectetur</p>
            </DisplayFont>
         ))}
      </ul>
   );
}

export default Fonts;
