import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { api } from "../../../services/api";
import { Class } from "../../../types/class";
import { Student } from "../../../types/student";
import { MenuItem, TextField } from "@mui/material";
import { StudentValidation } from "./validation/studentValidation";

const useStyles = makeStyles({
  form: {
    gap: 30,
    maxWidth: 400,
    display: "grid",
  },
});

type StudentFormProps = {
  student: Student;
  type: "new" | "edit";
  handleChange(index: keyof Student, value: any): void;
  validation: StudentValidation;
};

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  handleChange,
  validation,
  type,
}) => {
  const classes = useStyles();
  const [schoolClasses, setSchoolClasses] = useState<Class[]>([]);

  useEffect(() => {
    api
      .get("/school-class")
      .then((response) => setSchoolClasses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const inputs = {
    name: useRef<HTMLInputElement>(null),
    document: useRef<HTMLInputElement>(null),
    class: useRef<HTMLInputElement>(null),
    module: useRef<HTMLInputElement>(null),
    registration_number: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as [keyof typeof inputs];

    if (!key || !inputs[key]) return;

    inputs[key].current?.focus();
  }, [validation]); // eslint-disable-line

  return (
    <div className={classes.form}>
      <TextField
        inputRef={inputs.name}
        error={!!validation.name}
        helperText={validation.name}
        label="Nome"
        placeholder="Digite um nome para o estudante"
        margin="normal"
        fullWidth
        autoFocus
        value={student.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <TextField
        select
        inputRef={inputs.class}
        error={!!validation.class}
        helperText={validation.class}
        label="Sala"
        placeholder="Digite a turma do estudante"
        margin="normal"
        fullWidth
        value={student.class_school_id}
        onChange={(e) => handleChange("class_school_id", e.target.value)}
      >
        {schoolClasses.map((item) => (
          <MenuItem value={item.id}>{item.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        inputRef={inputs.document}
        error={!!validation.document}
        helperText={validation.document}
        label="Documento"
        placeholder="Documento"
        value={student.document}
        onChange={(e) => handleChange("document", e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        inputRef={inputs.registration_number}
        error={!!validation.registration_number}
        helperText={validation.registration_number}
        label="Número de registro"
        placeholder="Número de registro"
        value={student.registration_number}
        onChange={(e) => handleChange("registration_number", e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        inputRef={inputs.module}
        error={!!validation.module}
        helperText={validation.module}
        label="Módulo"
        placeholder="Digite o módulo do estudante"
        margin="normal"
        fullWidth
        value={student.module}
        onChange={(e) => handleChange("module", e.target.value)}
      >
        {type === "new" ? (
          <MenuItem value={1}>Módulo 1</MenuItem>
        ) : (
          <>
            <MenuItem value={1}>Módulo 1</MenuItem>
            <MenuItem value={2}>Módulo 2</MenuItem>
            <MenuItem value={3}>Módulo 3</MenuItem>
          </>
        )}
      </TextField>

      <button type="submit" style={{ display: "none" }} />
    </div>
  );
};

export default StudentForm;
