import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button/Button";
import { IconButton } from "./components/IconButton/IconButton";
import { mainTheme } from "./components/shared/theme";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Button />
      <IconButton />
    </ThemeProvider>
  );
}

export default App;
