import { createContext, useContext } from "react";
import { School } from "../types/school";

type AppContextValue = {
  isOpenedMenu: boolean;
  isMobile: boolean;
  windowWidth: number;
  handleOpenMenu(): void;
  school: School | null;
};

const AppContext = createContext<AppContextValue>({} as AppContextValue);
export const AppProvider = AppContext.Provider;

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  return context;
}
