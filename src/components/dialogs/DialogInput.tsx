import React, { useState, useCallback, useContext, ReactElement } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    overflowY: 'auto',
    padding: '0 30px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '0 30px 40px !important',
    },
  },
  root: {
    paddingRight: '0!important',
    position: 'relative',
  },
  paper: ({ bgColor }: { bgColor: string }) => ({
    backgroundColor: bgColor,
    minHeight: '30vh',
  }),
  content: {
    padding: 20,
  },
}));

type DialogInputProps = {
  bgColor?: string;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  hideBackdrop?: boolean;
  children: ReactElement;
};

type DialogInputContextData = {
  handleClose(): void;
};

const DialogInputContext = React.createContext<DialogInputContextData>({} as DialogInputContextData);

export const DialogInputConsumer = DialogInputContext.Consumer;

export function useInputDialog(): DialogInputContextData {
  const context = useContext(DialogInputContext);
  return context;
}

const DialogInput: React.FC<DialogInputProps> = ({
  bgColor = '#fff',
  maxWidth = 'md',
  hideBackdrop = true,
  children,
}) => {
  const [open, setOpen] = useState(true);
  const styleProps = { bgColor };
  const classes = useStyles(styleProps);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog
      classes={{ root: classes.root, paper: classes.paper }}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={maxWidth}
      hideBackdrop={hideBackdrop}
    >
      <DialogContent className={classes.content}>
        <DialogInputContext.Provider value={{ handleClose }}>{children}</DialogInputContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInput;
