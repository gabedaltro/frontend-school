import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Done } from "@mui/icons-material";

type ReportCardActionsProps = {
  handleSubmit(): void;
};

const ReportCardActions: React.FC<ReportCardActionsProps> = ({
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

export default ReportCardActions;
