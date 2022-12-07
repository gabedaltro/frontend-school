import React, {
  useCallback,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type PaginationContextValue = {
  rowsPerPage: number;
  page: number;
  handleSetPage(page: number): void;
  handleSetRowsPerPage(rowsPerPage: number): void;
  rowsPerPageOption: Array<number>;
};

const PaginationContext = createContext<PaginationContextValue>(
  {} as PaginationContextValue
);

const rowsPerPageOption = [6, 12, 24, 48, 96];

export function usePagination(): PaginationContextValue {
  const context = useContext(PaginationContext);
  return context;
}

interface PaginationProviderProps {
  children: ReactNode;
}

const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(96);
  const [page, setPage] = useState(0);

  const handleSetPage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleSetRowsPerPage = useCallback((rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
  }, []);

  return (
    <PaginationContext.Provider
      value={{
        rowsPerPage,
        page,
        handleSetPage,
        handleSetRowsPerPage,
        rowsPerPageOption,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
