import React from "react";
import { useApp } from "../../hooks/app";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import { SIDEBAR_WIDTH } from "../../constants/constants";

const useStyles = makeStyles({
  loading: {
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
    paddingLeft: ({ openedMenu }: { openedMenu: boolean }) =>
      openedMenu ? SIDEBAR_WIDTH : 0,
    backgroundColor: "rgba(250, 250, 250, 0.5)",
  },
  circularProgress: {
    top: "25%",
    position: "absolute",
  },
  body: {
    overflowY: "hidden",
    paddingRight: 17,
  },
});

const Loading: React.FC = () => {
  const app = useApp();

  const stylesProps = { openedMenu: app.isOpenedMenu };
  const classes = useStyles(stylesProps);

  return (
    <div className={classes.loading}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
