import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Done } from "@mui/icons-material";

type StudentActionsProps = {
  handleSubmit(): void;
};

const StudentActions: React.FC<StudentActionsProps> = ({ handleSubmit }) => {
  return (
    <Tooltip title="Salvar">
      <IconButton color="inherit" onClick={handleSubmit}>
        <Done />
      </IconButton>
    </Tooltip>
  );
};

export default StudentActions;
