import React from "react";
import { Grid } from "@mui/material";
import List from "../../../../components/list/List";
import { ReportCard } from "../../../../types/reportCard";
import ReportCardItemModule from "./ReportCardItemModule";

type ReportCardListModuleProps = {
  reportCards: ReportCard[];
};

const ReportCardListModule: React.FC<ReportCardListModuleProps> = ({
  reportCards,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {reportCards.map((reportCard) => (
            <ReportCardItemModule key={reportCard.id} reportCard={reportCard} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ReportCardListModule;
