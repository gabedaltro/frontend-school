import React from "react";
import { Grid } from "@mui/material";
import { Class } from "../../../../types/class";
import ClassroomItemModule from "./ClassroomItemModule";
import List from "../../../../components/list/List";

type ClassroomListModuleProps = {
  classrooms: Class[];
};

const ClassroomListModule: React.FC<ClassroomListModuleProps> = ({
  classrooms,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {classrooms.map((classroom) => (
            <ClassroomItemModule key={classroom.id} classroom={classroom} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ClassroomListModule;
