import React from "react";
import { Done } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

type ReportCardActionsProps = {
  handleSubmit(): void;
  loading: boolean;
};

const ReportCardActions: React.FC<ReportCardActionsProps> = ({
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

export default ReportCardActions;
