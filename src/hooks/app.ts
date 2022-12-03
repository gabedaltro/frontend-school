import { createContext, useContext } from "react";

type AppContextValue = {
  isOpenedMenu: boolean;
  handleOpenMenu(): void;
};

const AppContext = createContext<AppContextValue>({} as AppContextValue);
export const AppProvider = AppContext.Provider;

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  return context;
}
