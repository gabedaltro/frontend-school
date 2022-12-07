import React from "react";
import { makeStyles } from "@mui/styles";
import {
  ListProps as NativeListProps,
  List as NativeList,
  Theme,
} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    gridAutoRows: "min-content",
    gridGap: 7,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
}));

type ListProps = NativeListProps;

const List: React.FC<ListProps> = ({ children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <NativeList className={`${classes.list} ${className}`} {...rest}>
      {children}
    </NativeList>
  );
};

export default List;
