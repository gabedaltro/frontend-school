import React from "react";
import { TablePagination as NativeTablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { usePagination } from "../../hooks/pagination";

const useStyles = makeStyles({
  selectRoot: {
    marginRight: 10,
  },
  toolbar: {
    paddingLeft: "0!important",
  },
  actions: {
    marginLeft: 0,
  },
});

type PaginationProps = {
  count: number;
};

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const {
    rowsPerPage,
    page,
    rowsPerPageOption,
    handleSetPage,
    handleSetRowsPerPage,
  } = usePagination();
  const classes = useStyles();

  function handlePageChange(page: number) {
    handleSetPage(page);
  }

  function handleRowsPerPageChange(rows: number) {
    handleSetRowsPerPage(rows);
  }

  return (
    <NativeTablePagination
      classes={{
        selectRoot: classes.selectRoot,
        toolbar: classes.toolbar,
        actions: classes.actions,
      }}
      labelRowsPerPage="Registros"
      rowsPerPageOptions={rowsPerPageOption}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        "aria-label": "Página anterior",
      }}
      nextIconButtonProps={{
        "aria-label": "Próxima Página",
      }}
      onPageChange={(e, page) => handlePageChange(page)}
      onRowsPerPageChange={(e) =>
        handleRowsPerPageChange(parseFloat(e.target.value))
      }
    />
  );
};

export default Pagination;
