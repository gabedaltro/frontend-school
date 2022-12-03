import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #f5f5f5",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 15,
    "& div + div": {
      marginTop: 10,
    },
  },
  container: {
    marginTop: 10,
    display: "grid",
    flex: 1,
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: 7,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  item: {
    width: "100%",
    height: 15,
  },
}));

const cards = Array(6).fill("");

const ModuleLoading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {cards.map((value, index) => (
        <div className={classes.card} key={index}>
          <div className={`animated-background ${classes.item}`} />
          <div className={`animated-background ${classes.item}`} />
          <div className={`animated-background ${classes.item}`} />
        </div>
      ))}
    </div>
  );
};

export default ModuleLoading;
