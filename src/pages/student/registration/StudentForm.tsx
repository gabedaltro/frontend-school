import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { Student } from "../../../types/student";
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
  handleChange(index: keyof Student, value: any): void;
  validation: StudentValidation;
};

const StudentForm: React.FC<StudentFormProps> = ({
  student,
  handleChange,
  validation,
}) => {
  const classes = useStyles();

  const inputs = {
    name: useRef<HTMLInputElement>(null),
    document: useRef<HTMLInputElement>(null),
    class: useRef<HTMLInputElement>(null),
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
        inputRef={inputs.class}
        error={!!validation.class}
        helperText={validation.class}
        label="Sala"
        placeholder="Digite a sala do estudante"
        margin="normal"
        fullWidth
        value={student.class}
        onChange={(e) => handleChange("class", e.target.value)}
      />

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

      <button type="submit" style={{ display: "none" }} />
    </div>
  );
};

export default StudentForm;
