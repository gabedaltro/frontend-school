import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Teacher } from "../../../../types/teacher";
import ListItem from "../../../../components/list-item/ListItem";

type TeacherItemModuleProps = {
  teacher: Teacher;
};

const TeacherItemModule: React.FC<TeacherItemModuleProps> = ({ teacher }) => {
  const history = useNavigate();

  return (
    <ListItem onClick={() => history(`/teacher/${teacher.id}`)}>
      <Typography variant="h6" gutterBottom>
        {teacher.name}
      </Typography>
      <Typography variant="body2">
        Registro Acadêmico - {teacher.academic_title}
      </Typography>
      <Typography variant="body2">Documento - {teacher.document}</Typography>
      <Typography variant="body2">{teacher.discipline_teaches}</Typography>
    </ListItem>
  );
};

export default TeacherItemModule;
