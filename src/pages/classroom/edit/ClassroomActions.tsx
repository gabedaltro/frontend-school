import React from "react";
import { Done } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type ClassroomActionsProps = {
  handleSubmit(): void;
  loading: boolean;
};

const ClassroomActions: React.FC<ClassroomActionsProps> = ({
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

export default ClassroomActions;
