import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Done } from "@mui/icons-material";

type ClassroomActionsProps = {
  handleSubmit(): void;
};

const ClassroomActions: React.FC<ClassroomActionsProps> = ({
  handleSubmit,
}) => {
  return (
    <Tooltip title="Salvar">
      <IconButton color="inherit" onClick={handleSubmit}>
        <Done />
      </IconButton>
    </Tooltip>
  );
};

export default ClassroomActions;
