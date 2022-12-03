import React from "react";
import { makeStyles } from "@mui/styles";
import { LinearProgress } from "@mui/material";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1400,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#30519f",
  },
  logo: {
    width: 150,
  },
  progress: {
    width: 200,
    marginTop: 50,
  },
  content: {
    top: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

const SplashScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <img
          className={classes.logo}
          src="https://h2i.s3.sa-east-1.amazonaws.com/upload/images/10043820210217602d14662205f.png"
          alt="logo h2i"
        />
        <div className={classes.progress}>
          <LinearProgress color="secondary" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
