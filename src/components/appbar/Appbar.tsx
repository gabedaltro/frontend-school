import React, { ReactElement } from "react";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SIDEBAR_WIDTH } from "../../constants/constants";
import {
  AppBar as NativeAppbar,
  Toolbar,
  IconButton,
  Typography,
  Theme,
  styled,
} from "@mui/material";

type AppbarProps = {
  title: string;
  ActionsComponent?: ReactElement;
  backAction?(): void;
  Tab?: ReactElement;
};

const useStyles = makeStyles<Theme>((theme) => ({
  actions: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBarTabsSpace: {
    marginBottom: 45,
    [theme.breakpoints.down("md")]: {
      marginBottom: 48,
    },
  },
  appBarTabsMenuOpen: {
    paddingLeft: SIDEBAR_WIDTH,
  },
}));

const AppbarStyled = styled(NativeAppbar)((props) => ({
  boxShadow: "none",
  zIndex: 1102,
  "@media print": {
    display: "none",
  },
}));

interface AppbarTabsStyledProps {
  isOpenedMenu: boolean;
  isMobile: boolean;
  windowWidth: number;
}

const shouldNotFowardProps = ["isOpenedMenu", "isMobile", "windowWidth"];

const AppbarTabsStyled = styled(NativeAppbar, {
  shouldForwardProp: (prop) => !shouldNotFowardProps.includes(prop as string),
})<AppbarTabsStyledProps>(({ theme, isOpenedMenu, isMobile, windowWidth }) => ({
  top: 64,
  [theme.breakpoints.down("md")]: {
    top: 56,
  },
  [theme.breakpoints.between("xs", "xs") + " and (orientation: landscape)"]: {
    top: 48,
  },
  [theme.breakpoints.up("lg")]: {
    backgroundColor: theme.palette.primary.light,
  },
  paddingLeft:
    isOpenedMenu && !isMobile && windowWidth > 960 ? SIDEBAR_WIDTH : 0,
  transition: "padding-left 400ms ease",
}));

const Appbar: React.FC<AppbarProps> = ({
  title,
  ActionsComponent,
  backAction,
  Tab,
}) => {
  const classes = useStyles();
  const app = useApp();

  return (
    <>
      <AppbarStyled position="fixed">
        <Toolbar>
          {backAction && app.isMobile && app.windowWidth < 960 ? (
            <IconButton onClick={backAction} color="inherit">
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton onClick={app.handleOpenMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
          <div className={classes.title}>
            <Typography color="inherit">
              {app.isMobile || app.windowWidth < 960 ? title : "Escola Facs"}
            </Typography>
          </div>
          {ActionsComponent && (
            <div className={classes.actions}>{ActionsComponent}</div>
          )}
        </Toolbar>
      </AppbarStyled>
      {Tab && (
        <>
          <AppbarTabsStyled
            isOpenedMenu={app.isOpenedMenu}
            isMobile={app.isMobile}
            windowWidth={app.windowWidth}
          >
            {Tab}
          </AppbarTabsStyled>
          <div className={Tab && classes.appBarTabsSpace} />
        </>
      )}
    </>
  );
};

export default Appbar;
