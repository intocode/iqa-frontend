import { ThemeProvider } from "styled-components"
import { mainTheme } from "../src/components/shared/theme"

export const parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'grey',
        value: '#e5e5e5',
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [(Story) => (
  <ThemeProvider theme={mainTheme}>
    <Story />
  </ThemeProvider>
)]
