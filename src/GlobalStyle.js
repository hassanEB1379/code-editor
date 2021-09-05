import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: calc(60% + 0.8vmin);
    font-family: 'Open Sans', serif;
  }

  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    font-size: 1rem;
  }
`;

export default GlobalStyle;
