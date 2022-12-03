import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Snackbar, SnackbarContent, Theme } from "@mui/material";
import {
  useMessaging,
  Options,
  CallbackFunction,
} from "../../providers/messaging";

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: "#28a745",
  },
  error: {
    backgroundColor: "#dc3545",
  },
  warning: {
    backgroundColor: "#ffc107",
  },
  info: {
    backgroundColor: "#17a2b8",
  },
  primary: {
    backgroundColor: "#007bff",
  },
  message: {
    marginLeft: 10,
    paddingTop: 3,
  },
  messageContent: {
    display: "flex",
  },
  snackbar: {
    // bottom: 10,
  },
  warningText: {
    color: "#ffc107",
  },
  actionText: {
    color: theme.palette.secondary.main,
  },
}));

interface MessagingProps {
  message: string;
  options: Options | null;
  action: CallbackFunction | null;
  handleAction(): void;
  open: boolean;
}

const Messaging: React.FC<MessagingProps> = ({
  message,
  options,
  action,
  handleAction,
  open,
}) => {
  const classes = useStyles();
  const msg = useMessaging();

  return (
    <Snackbar
      style={options || undefined}
      classes={{
        anchorOriginBottomCenter: classes.snackbar,
      }}
      open={open}
      onClose={msg.handleClose}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <SnackbarContent
        message={
          <div className={classes.messageContent}>
            <span className={classes.message}>{message}</span>
          </div>
        }
        action={
          action ? (
            <Button
              classes={{ root: classes.actionText }}
              size="small"
              onClick={handleAction}
            >
              Desfazer
            </Button>
          ) : (
            <Button
              size="small"
              classes={{ root: classes.actionText }}
              onClick={msg.handleClose}
            >
              Fechar
            </Button>
          )
        }
      />
    </Snackbar>
  );
};

export default Messaging;
