import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Done } from "@mui/icons-material";

type TeacherActionsProps = {
  handleSubmit(): void;
};

const TeacherActions: React.FC<TeacherActionsProps> = ({ handleSubmit }) => {
  return (
    <Tooltip title="Salvar">
      <IconButton color="inherit" onClick={handleSubmit}>
        <Done />
      </IconButton>
    </Tooltip>
  );
};

export default TeacherActions;
