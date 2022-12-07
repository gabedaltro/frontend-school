import { createContext, useContext } from "react";
import { TableTemplate } from "../../../types/tableTemplate";

type TableContextValue = {
  width?: number;
  tableTemplate: TableTemplate[];
  templateColumns: string;
  handleChangeTemplate(id: string): void;
};

const TableContext = createContext<TableContextValue>({} as TableContextValue);
export const TableContextProvider = TableContext.Provider;
export const TableContextConsumer = TableContext.Consumer;

export function useTable(): TableContextValue {
  const context = useContext(TableContext);
  return context;
}
