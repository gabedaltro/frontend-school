import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { Class } from "../../../types/class";
import { ClassValidation } from "./validation/classValidation";

const useStyles = makeStyles({
  form: {
    gap: 30,
    maxWidth: 400,
    display: "grid",
  },
});

type ClassroomFormProps = {
  class: Class;
  handleChange(index: keyof Class, value: any): void;
  validation: ClassValidation;
};

const ClassroomForm: React.FC<ClassroomFormProps> = ({
  class: classroom,
  handleChange,
  validation,
}) => {
  const classes = useStyles();

  const inputs = {
    name: useRef<HTMLInputElement>(null),
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
        placeholder="Digite um nome a turma"
        margin="normal"
        fullWidth
        autoFocus
        value={classroom.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <button type="submit" style={{ display: "none" }} />
    </div>
  );
};

export default ClassroomForm;
