import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#fff",
    margin: "10px 0",
    width: "100%",
    minHeight: "calc(100vh - 330px)",
    position: "relative",
  },
});

interface TableContentProps {
  children: ReactNode;
}

const TableContent: React.FC<TableContentProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default TableContent;
