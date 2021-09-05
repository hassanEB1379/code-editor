import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root{
    --dark-bg : #060606;
    --dark-border : #2f2f2f;
  }
  
  html {
    box-sizing: border-box;
    font-size: calc(60% + 0.8vmin);
    font-family: 'Open Sans',sans-serif;
    letter-spacing: 1px;
  }

  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    letter-spacing: inherit;
  }
`;

export default GlobalStyle;
