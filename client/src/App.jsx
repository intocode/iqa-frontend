import { ThemeProvider } from "styled-components";
import { Alert } from "./components/Alert/Alert";
import { Button } from "./components/Button/Button";
import { IconButton } from "./components/IconButton/IconButton";
import { mainTheme } from "./components/shared/theme";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Button />
      <IconButton />
      <Alert />
    </ThemeProvider>
  );
}

export default App;
