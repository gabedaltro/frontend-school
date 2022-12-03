import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: 1,
    background: "#fff",
    marginTop: 10,
    padding: 10,
  },
});

type NoDataProps = {
  message: string;
};

const NoData: React.FC<NoDataProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography color="#666">{message}</Typography>
    </div>
  );
};

export default NoData;
