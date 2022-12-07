import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../types/student";
import ListItem from "../../../../components/list-item/ListItem";

type StudentItemModuleProps = {
  student: Student;
};

const StudentItemModule: React.FC<StudentItemModuleProps> = ({ student }) => {
  const history = useNavigate();

  return (
    <ListItem onClick={() => history(`/student/${student.id}`)}>
      <Typography variant="h6" gutterBottom>
        {student.name}
      </Typography>
      <Typography variant="body2">
        Registro - {student.registration_number}
      </Typography>
      <Typography variant="body2">Documento - {student.document}</Typography>
      <Typography variant="body2">Módulo {student.module}</Typography>
    </ListItem>
  );
};

export default StudentItemModule;
