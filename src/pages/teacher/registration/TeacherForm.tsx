import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { api } from "../../../services/api";
import { Class } from "../../../types/class";
import { Teacher } from "../../../types/teacher";
import { MenuItem, TextField } from "@mui/material";
import { TeacherValidation } from "./validation/teacherValidation";

const useStyles = makeStyles({
  form: {
    gap: 30,
    maxWidth: 400,
    display: "grid",
  },
});

type TeacherFormProps = {
  teacher: Teacher;
  handleChange(index: keyof Teacher, value: any): void;
  validation: TeacherValidation;
};

const TeacherForm: React.FC<TeacherFormProps> = ({
  teacher,
  handleChange,
  validation,
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
    class: useRef<HTMLInputElement>(null),
    document: useRef<HTMLInputElement>(null),
    discipline: useRef<HTMLInputElement>(null),
    academic_title: useRef<HTMLInputElement>(null),
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
        placeholder="Digite um nome para o professor"
        margin="normal"
        fullWidth
        autoFocus
        value={teacher.name}
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
        value={teacher.class_school_id}
        onChange={(e) => handleChange("class_school_id", e.target.value)}
      >
        {schoolClasses.map((item) => (
          <MenuItem value={item.id}>{item.name}</MenuItem>
        ))}
      </TextField>

      <TextField
        inputRef={inputs.discipline}
        error={!!validation.discipline}
        helperText={validation.discipline}
        label="Disciplina"
        placeholder="Digite a disciplina do professor"
        margin="normal"
        fullWidth
        value={teacher.discipline_teaches}
        onChange={(e) => handleChange("discipline_teaches", e.target.value)}
      />

      <TextField
        inputRef={inputs.document}
        error={!!validation.document}
        helperText={validation.document}
        label="Documento"
        placeholder="Documento"
        value={teacher.document}
        onChange={(e) => handleChange("document", e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        inputRef={inputs.academic_title}
        error={!!validation.academic_title}
        helperText={validation.academic_title}
        label="Título acadêmico"
        placeholder="Título acadêmico"
        value={teacher.academic_title}
        onChange={(e) => handleChange("academic_title", e.target.value)}
        fullWidth
        margin="normal"
      />

      <button type="submit" style={{ display: "none" }} />
    </div>
  );
};

export default TeacherForm;
