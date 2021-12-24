import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fff;
    --black : #000;
    --dark-bg: #060606;
    --dark-bg-transparent: #0606067F;
    --paper: #131417;
    --paper-border: #252830;
    --dark-btn: #444857;
    --dark-bth-hover: #5a5f73;
    --dark-border: #2f2f2f;
    --contrast-text: #fff;
    --text-disabled: #aaaebc;
    --tab-bg: #1d1e22;
    --tab-indicator: #34363e;
    --dropdown-bg: #1e1f26;
    --command-line-bg: #ffffff2e;
    --command-line-return-bg: #ffffff21;
    --divider-bg: #4b4b4b;
    --z-alerts: 1100;
    --z-999: 999;
    --z-100: 100;
    --z-50: 50;
    --z-30: 30;
    --z-10: 10;
    --form-border: #223851;
    --form-submit-bg: #26b026;
    --field-border: #cccccc;
    --field-border-focus: #b190ff;
    --form-error-text: #ff4949;
    --work-body-bg: #1e1f26;
    --menu-bg: #fff;
    --menu-text: #000;
    --menu-item-hover: #cfd2d7;
    --error: #ff3f3f;
    --warning: #fbc803;
    --info: #6d6dff;
    --success: #37F900;
    --console-number: #8080ff;
    --console-str: #4bffdb;
    --input-bg: #e3e4e8;
    --shadow: 0 0 5px 0 #2b2b2b;
  }

  html {
    box-sizing: border-box;
    font-size: calc(60% + 0.8vmin);
  }

  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  body {
    color: var(--contrast-text);
    background-color: var(--dark-bg);
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 1px;
    user-select: none;
  }

  #root {
    overflow-y: auto;
    height: 100vh;
  }

  #root > div {
    height: 100%;
  }

  ul {
    list-style: none;
  }

  // reset link style
  a {
    color: inherit;
    text-decoration: none;
  }

  // reset input default style
  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
    letter-spacing: inherit;
  }

  input {
    appearance: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    color: inherit;
    border: none;
    cursor: pointer;
    background-color: inherit;

    &:focus {
      outline: 0;
    }
  }
`;

export default GlobalStyle;
