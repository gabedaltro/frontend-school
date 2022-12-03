import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    height: "100%",
  },
  action: {
    marginTop: 20,
  },
});

const Error404: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h4" color="textSecondary">
          Pagína não encontrada.
        </Typography>
        <div className={classes.action}>
          <Link to="/">Voltar ao início</Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
