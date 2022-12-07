import React from "react";
import { Grid } from "@mui/material";
import TeacherItemModule from "./TeacherItemModule";
import { Teacher } from "../../../../types/teacher";
import List from "../../../../components/list/List";

type TeacherListModuleProps = {
  teachers: Teacher[];
};

const TeacherListModule: React.FC<TeacherListModuleProps> = ({ teachers }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {teachers.map((teacher) => (
            <TeacherItemModule key={teacher.id} teacher={teacher} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TeacherListModule;
