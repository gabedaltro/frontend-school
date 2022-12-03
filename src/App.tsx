import { useEffect, useState } from "react";
import { theme } from "./config/theme";
import AppRoutes from "./routes/Routes";
import { AppProvider } from "./hooks/app";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { mobileCheck } from "./helpers/MobileCheck";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(mobileCheck());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenedMenu, setIsOpenedMenu] = useState(
    !mobileCheck() && windowWidth > 1280
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setIsMobile(mobileCheck());
    setWindowWidth(window.innerWidth);
  }

  function handleOpenMenu() {
    setIsOpenedMenu(!isOpenedMenu);
  }

  return (
    <BrowserRouter>
      <AppProvider
        value={{ handleOpenMenu, isOpenedMenu, isMobile, windowWidth }}
      >
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;

