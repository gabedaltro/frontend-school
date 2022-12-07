import React from "react";
import { makeStyles } from "@mui/styles";
import { MoreHoriz } from "@mui/icons-material";
import { Class } from "../../../../types/class";
import { IconButton, Typography } from "@mui/material";
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

type ClassroomItemTableProps = {
  classroom: Class;
};

const ClassroomItemTable: React.FC<ClassroomItemTableProps> = ({
  classroom,
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
                {classroom[item.id as keyof Class]}
              </Typography>
            </div>
          )
        )}
    </>
  );
};

export default ClassroomItemTable;
