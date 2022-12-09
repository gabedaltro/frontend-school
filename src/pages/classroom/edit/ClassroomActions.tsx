import React from "react";
import { Delete, Done } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type ClassroomActionsProps = {
  handleSubmit(): void;
  handleDelete(): void;
  loading: boolean;
};

const ClassroomActions: React.FC<ClassroomActionsProps> = ({
  handleSubmit,
  handleDelete,
  loading,
}) => {
  return (
    <>
      <Tooltip title="Excluir">
        <span>
          <IconButton disabled={loading} color="inherit" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Salvar">
        <span>
          <IconButton disabled={loading} color="inherit" onClick={handleSubmit}>
            <Done />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
};

export default ClassroomActions;
