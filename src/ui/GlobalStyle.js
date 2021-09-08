import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --dark-bg: #060606;
    --dark-btn: #444857;
    --dark-bth-hover: #5a5f73;
    --dark-border: #2f2f2f;
    --contrast-text: #fff;
  }

  html {
    box-sizing: border-box;
    font-size: calc(60% + 0.8vmin);
  }

  body {
    color: var(--contrast-text);
    background-color: var(--dark-bg);
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 1px;
  }

  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;
