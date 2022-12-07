import { useEffect, useState } from "react";
import { theme } from "./config/theme";
import AppRoutes from "./routes/Routes";
import { AppProvider } from "./hooks/app";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { mobileCheck } from "./helpers/MobileCheck";
import MessagingProvider from "./providers/messaging";
import { api } from "./services/api";
import { School } from "./types/school";
import Loading from "./components/loading/Loading";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(mobileCheck());
  const [school, setSchool] = useState<School | null>(null);
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

  useEffect(() => {
    setLoading(true);

    api
      .get("/school")
      .then((response) => setSchool(response.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <AppProvider
        value={{ handleOpenMenu, isOpenedMenu, isMobile, windowWidth, school }}
      >
        <ThemeProvider theme={theme}>
          <MessagingProvider>
            <>
              {loading && <Loading />}
              <AppRoutes />
            </>
          </MessagingProvider>
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;

