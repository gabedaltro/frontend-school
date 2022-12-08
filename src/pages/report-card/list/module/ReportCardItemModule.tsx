import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReportCard } from "../../../../types/reportCard";
import ListItem from "../../../../components/list-item/ListItem";

type ReportCardItemModuleProps = {
  reportCard: ReportCard;
};

const ReportCardItemModule: React.FC<ReportCardItemModuleProps> = ({
  reportCard,
}) => {
  const history = useNavigate();

  return (
    <ListItem onClick={() => history(`/report-card/${reportCard.id}`)}>
      <Typography variant="h6" gutterBottom>
        Aluno - {reportCard.student_id}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Nota - {reportCard.final_grade}
      </Typography>
    </ListItem>
  );
};

export default ReportCardItemModule;
