import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useApp } from "../../hooks/app";
import { makeStyles } from "@mui/styles";
import { Home } from "@mui/icons-material";
import { SidebarProvider } from "./hook/useSidebar";
import Registration from "./collapsible/Registration";
import { Drawer, Theme, Typography } from "@mui/material";
import { SIDEBAR_WIDTH } from "../../constants/constants";

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    display: "flex",
    justifyContent: "space-between",
    width: SIDEBAR_WIDTH,
    "@media print": {
      display: "none",
    },
  },
  drawerHeader: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    height: 64,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.secondary.light}`,
  },
  logout: {
    position: "absolute",
    bottom: 0,
  },
  account: {
    minHeight: 90,
    marginTop: 30,
  },
  content: {
    transition: "opacity 0.4s ease",
    opacity: 1,
  },
  sidebarItemAvatar: {
    marginBottom: 10,
  },
}));

export type Collapsible = {
  registration: boolean;
};

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const app = useApp();
  const [collapsible, setCollapsible] = useState<Collapsible>({
    registration: false,
  });

  function handleCollapseClick(
    index: keyof Collapsible,
    closeOthers = true
  ): void {
    if (closeOthers) {
      const keys = Object.keys(collapsible);

      let otherValues: Collapsible = {} as Collapsible;
      keys.forEach((key) => {
        otherValues = {
          ...otherValues,
          [key]: false,
        };
      });

      setCollapsible({
        ...otherValues,
        [index]: !collapsible[index],
      });
      return;
    }

    setCollapsible({
      ...collapsible,
      [index]: !collapsible[index],
    });
  }

  return (
    <SidebarProvider value={{ handleCollapseClick, collapsible }}>
      <Drawer
        variant={
          app.isMobile || app.windowWidth < 1280 ? "temporary" : "persistent"
        }
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={app.isOpenedMenu}
        onClose={app.handleOpenMenu}
      >
        <div className={classes.content}>
          <div className={classes.drawerHeader}>
            <Typography variant="h6">Escola Facs</Typography>
          </div>

          <SidebarItem to="/" icon={<Home />} text="Home" />

          <Registration />
        </div>
      </Drawer>
    </SidebarProvider>
  );
};

export default Sidebar;
