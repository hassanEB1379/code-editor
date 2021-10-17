import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --dark-bg: #060606;
    --dark-btn: #444857;
    --dark-bth-hover: #5a5f73;
    --dark-border: #2f2f2f;
    --contrast-text: #fff;
    --text-disabled : #aaaebc;
    --tab-bg: #1d1e22;
    --tab-indicator : #34363e;
    --dropdown-bg: #1e1f26;
    --command-line-bg: #ffffff2e;
    --command-line-return-bg: #ffffff21;
    --divider-bg: #4b4b4b;
    --z-999 : 999;
    --z-100 : 100;
    --z-50 : 50;
    --z-30: 30;
    --z-10: 10;
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
    user-select: none;
  }
  
  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
    letter-spacing: inherit;
  }
  
  // reset input default style
  input {
    appearance: none;
    border:none;
    &:focus {
      outline : none;
    }
  }
  
  // create custom title tooltip (using data-title attribute)
  [data-title] {
    position:relative;
  }
  
  [data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.3s;
    visibility: visible;
  }
  
  [data-title]:after {
    content: attr(data-title);
    font-size: .75rem;
    position: absolute;
    top: 110%;
    left: 0;
    padding: 4px;
    border: 2px solid #727272;
    white-space: nowrap;
    opacity: 0;
    z-index: 99999;
    visibility: hidden;
    background-color: var(--dark-btn);
    color: inherit;
  }
`;

export default GlobalStyle;
