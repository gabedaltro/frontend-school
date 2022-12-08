import React from "react";
import { makeStyles } from "@mui/styles";
import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { ReportCard } from "../../../../types/reportCard";
import { useTable } from "../../../../components/table/hook/useTable";

const useStyles = makeStyles({
  iconButton: {
    justifySelf: "baseline",
    padding: 5,
  },
  numericData: {
    justifyContent: "flex-end",
    display: "flex",
    marginRight: 20,
  },
});

type ReportCardItemTableProps = {
  reportCard: ReportCard;
};

const ReportCardItemTable: React.FC<ReportCardItemTableProps> = ({
  reportCard,
}) => {
  const classes = useStyles();
  const { tableTemplate } = useTable();

  return (
    <>
      {tableTemplate
        .filter((item) => !item.notShow)
        .map((item) =>
          item.id === "actions" ? (
            <IconButton key={item.id} className={classes.iconButton}>
              <MoreHoriz />
            </IconButton>
          ) : (
            <div
              key={item.id}
              className={
                item.dataType === "number" ? classes.numericData : undefined
              }
            >
              <Typography variant="body2">
                {reportCard[item.id as keyof ReportCard]}
              </Typography>
            </div>
          )
        )}
    </>
  );
};

export default ReportCardItemTable;
