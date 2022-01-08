import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .dark {
    --primary: #263238;
    --primary-light: #4f5b62;
    --primary-dark: #000a12;
    --primary-dark-transparent: rgba(0, 10, 18, 0.78);
    --secondary: #2962ff;
    --secondary-light: #768fff;
    --secondary-dark: #0039cb;
    --contrast-text: #fff;
    
    --border : 1px solid var(--primary-light);
  }

  :root {
    --z-alerts: 1100;
    --z-999: 999;
    --z-100: 100;
    --z-50: 50;
    --z-30: 30;
    --z-10: 10;

    --white: #fff;
    --black: #000;
    --error: #ff3f3f;
    --warning: #fbc803;
    --info: #6d6dff;
    --success: #37F900;
    --console-number: #8080ff;
    --console-str: #4bffdb;
    
    --shadow: 0 0 5px 0 #2b2b2b;
  }

  html {
    box-sizing: border-box;
    font-size: calc(8px + 0.7vmin);
  }

  *, *:after, *:before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  body {
    color: var(--contrast-text);
    background-color: var(--primary-dark);
    font-family: 'Roboto Mono', monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1rem;
    letter-spacing: 1px;
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
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
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
