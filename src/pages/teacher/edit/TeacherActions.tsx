import React from "react";
import { Done } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type TeacherActionsProps = {
  handleSubmit(): void;
  loading: boolean;
};

const TeacherActions: React.FC<TeacherActionsProps> = ({
  handleSubmit,
  loading,
}) => {
  return (
    <Tooltip title="Salvar">
      <span>
        <IconButton disabled={loading} color="inherit" onClick={handleSubmit}>
          <Done />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default TeacherActions;
