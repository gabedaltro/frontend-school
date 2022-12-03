import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import Sidebar from "../sidebar/Sidebar";
import { styled, Theme } from "@mui/material";
import { SIDEBAR_WIDTH } from "../../constants/constants";

interface StyleProps {
  sidebarwidth: number;
  isOpenedMenu: boolean;
}

const styles = makeStyles<Theme>((theme) => ({
  sidebarWrapper: {
    position: "fixed",
    height: "100%",
    zIndex: 1101,
  },
  container: {
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  content: {
    minHeight: "calc(100vh - 104px)",
    padding: "20px 30px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      padding: "15px",
    },
    "@media print": {
      padding: 0,
    },
  },
}));

const ContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOpenedMenu",
})<StyleProps>(({ theme, isOpenedMenu, sidebarwidth }) => ({
  width: "100%",
  margin: "64px 0 0",
  transition: "padding-left 0.4s ease",
  paddingLeft: isOpenedMenu ? sidebarwidth : 0,
  position: "relative",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    paddingLeft: 0,
  },
  [theme.breakpoints.down("xs")]: {
    margin: "57px 0 0",
  },
  "@media print": {
    padding: 0,
    margin: 0,
    overflowY: "initial",
  },
}));

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { isOpenedMenu } = useApp();
  const classes = styles({ sidebarwidth: SIDEBAR_WIDTH, isOpenedMenu });

  return (
    <div className={classes.container}>
      <div className={classes.sidebarWrapper}>
        <Sidebar />
      </div>
      <ContentWrapper
        sidebarwidth={SIDEBAR_WIDTH}
        isOpenedMenu={isOpenedMenu}
        id="content-wrapper"
      >
        <div id="app-content" className={classes.content}>
          {children}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DefaultLayout;
