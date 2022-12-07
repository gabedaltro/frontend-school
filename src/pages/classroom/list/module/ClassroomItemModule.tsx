import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Class } from "../../../../types/class";
import ListItem from "../../../../components/list-item/ListItem";

type ClassroomItemModuleProps = {
  classroom: Class;
};

const ClassroomItemModule: React.FC<ClassroomItemModuleProps> = ({
  classroom,
}) => {
  const history = useNavigate();

  return (
    <ListItem onClick={() => history(`/classroom/${classroom.id}`)}>
      <Typography variant="h6" gutterBottom>
        Turma - {classroom.name}
      </Typography>
    </ListItem>
  );
};

export default ClassroomItemModule;
