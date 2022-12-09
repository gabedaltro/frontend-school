import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
import DialogInput, { DialogInputConsumer } from "../dialogs/DialogInput";

const styles = makeStyles({
  container: {
    display: "flex",
    height: 200,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});

type DeleteConfirmationProps = {
  handleSubmit(): Promise<void>;
  name: string;
  description: string;
  onExited(): void;
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  handleSubmit,
  name,
  description,
  onExited,
}) => {
  const classes = styles();

  function handleYesClick(handleCloseModal: () => void) {
    handleSubmit();
    handleCloseModal();
  }
  return (
    <DialogInput maxWidth="sm">
      <DialogInputConsumer>
        {(context) => (
          <div className={classes.container}>
            <Typography align="center">
              Deseja realmente excluir {description} <strong>{name}</strong>?
            </Typography>
            <div className={classes.actions}>
              <Button
                color="primary"
                variant="text"
                onClick={() => {
                  onExited();
                  context.handleClose;
                }}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleYesClick(context.handleClose)}
              >
                Sim, excluir
              </Button>
            </div>
          </div>
        )}
      </DialogInputConsumer>
    </DialogInput>
  );
};

export default DeleteConfirmation;
