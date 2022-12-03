import { ThemeProvider } from "@mui/material";
import { theme } from "config/theme";
import { AppProvider } from "hooks/app";
import { useState } from "react";

function App() {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  function handleOpenMenu() {
    setIsOpenedMenu(!isOpenedMenu);
  }

  return (
    <AppProvider value={{ handleOpenMenu, isOpenedMenu }}>
      <ThemeProvider theme={theme}></ThemeProvider>
    </AppProvider>
  );
}

export default App;

