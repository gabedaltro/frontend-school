import React from "react";
import { Grid } from "@mui/material";
import StudentItemModule from "./StudentItemModule";
import { Student } from "../../../../types/student";
import List from "../../../../components/list/List";

type StudentListModuleProps = {
  students: Student[];
};

const StudentListModule: React.FC<StudentListModuleProps> = ({ students }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {students.map((student) => (
            <StudentItemModule key={student.id} student={student} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default StudentListModule;
