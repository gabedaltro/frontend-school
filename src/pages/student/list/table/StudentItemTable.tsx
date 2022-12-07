import React from "react";
import { makeStyles } from "@mui/styles";
import { MoreHoriz } from "@mui/icons-material";
import { Student } from "../../../../types/student";
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

type StudentItemTableProps = {
  student: Student;
};

const StudentItemTable: React.FC<StudentItemTableProps> = ({ student }) => {
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
                {student[item.id as keyof Student]}
              </Typography>
            </div>
          )
        )}
    </>
  );
};

export default StudentItemTable;
