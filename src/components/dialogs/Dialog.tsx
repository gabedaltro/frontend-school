import React, {
  useState,
  useContext,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";
import {
  Dialog as NativeDialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Theme,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";

const useStyles = makeStyles<Theme>((theme) => ({
  modal: {
    overflowY: "auto",
    padding: "0 30px 40px",
    [theme.breakpoints.down("md")]: {
      padding: "0 30px 40px !important",
    },
  },
  root: {
    paddingRight: "0!important",
    position: "relative",
  },
  appbarSpace: {
    marginBottom: 64,
    [theme.breakpoints.down("md")]: {
      marginBottom: 56,
    },
    [theme.breakpoints.between("xs", "xs") + " and (orientation: landscape)"]: {
      marginBottom: 48,
    },
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 64,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      marginTop: 56,
    },
    [theme.breakpoints.between("xs", "xs") + " and (orientation: landscape)"]: {
      marginTop: 48,
    },
    "@media print": {
      padding: 0,
      margin: 0,
    },
  },
  actions: {
    position: "absolute",
    left: 0,
    right: 0,
  },
}));

interface PaperStylesProps {
  backgroundColor: string;
  height: string | number;
}

const StyledAppbar = styled(AppBar)(({ theme }) => ({
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
  },
  "@media print": {
    display: "none",
  },
}));

const Paper = styled("div", {
  shouldForwardProp: (prop) => prop !== "height" && prop !== "backgroundColor",
})<PaperStylesProps>(({ theme, height, backgroundColor }) => ({
  backgroundColor: backgroundColor || "#fff",
  [theme.breakpoints.up("md")]: {
    height,
  },
}));

type DialogContextData = {
  handleClose(): void;
};

export const DialogContext = React.createContext<DialogContextData>(
  {} as DialogContextData
);

export const DialogConsumer = DialogContext.Consumer;

export function useDialog(): DialogContextData {
  const context = useContext(DialogContext);
  return context;
}

type DialogProps = {
  onExited(): void;
  title?: string;
  ComponentActions?: ReactElement;
  backgroundColor?: string;
  hideBackdrop?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  height?: string | number;
  fullScreen?: boolean;
  displayBottomActions?: boolean;
  children: ReactNode;
  onScroll?: () => void;
};

const Dialog: React.FC<DialogProps> = ({
  onExited,
  title,
  ComponentActions,
  children,
  backgroundColor = "#fff",
  hideBackdrop = false,
  maxWidth = "md",
  height = "100vh",
  fullScreen,
  displayBottomActions = false,
  onScroll,
}) => {
  const [open, setOpen] = useState(true);
  const app = useApp();
  const styleProps = {
    backgroundColor,
    title: !!title,
    isMobile: app.isMobile,
    height,
    displayBottomActions,
  };
  const classes = useStyles(styleProps);

  const handleClose = useCallback(() => {
    setOpen(false);
    onExited();
  }, [onExited]);

  return (
    <NativeDialog
      classes={{ root: classes.root, paper: classes.paper }}
      hideBackdrop={hideBackdrop}
      open={open}
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen || app.isMobile || app.windowWidth < 960}
      maxWidth={maxWidth}
    >
      {title && (
        <StyledAppbar>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography color="inherit" noWrap>
              {title}
            </Typography>
            <div className={classes.grow} />
            <DialogContext.Provider value={{ handleClose }}>
              <div>{ComponentActions}</div>
            </DialogContext.Provider>
          </Toolbar>
        </StyledAppbar>
      )}
      <DialogContext.Provider value={{ handleClose }}>
        <div className={classes.content} onScroll={onScroll}>
          <Paper backgroundColor={backgroundColor} height={height}>
            {children}
          </Paper>
        </div>
      </DialogContext.Provider>
    </NativeDialog>
  );
};

export default Dialog;
