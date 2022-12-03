import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Collapsible } from "../Sidebar";

export interface SidebarContextValue {
  handleCollapseClick(
    collapsible: keyof Collapsible,
    closeOthers?: boolean
  ): void;
  collapsible: Collapsible;
}

const SidebarContext = createContext<SidebarContextValue>(
  {} as SidebarContextValue
);
export const SidebarProvider = SidebarContext.Provider;
export const SidebarConsumer = SidebarContext.Consumer;

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  return context;
}
