import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
}

html, body {
  font-family: 'Roboto', sans-serif;
  background-color: #F5F5F5;
}

.container {
  max-width: 844px;
}
`;
