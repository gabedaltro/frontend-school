import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { api } from "../../../services/api";
import { Student } from "../../../types/student";
import { MenuItem, TextField } from "@mui/material";
import { ReportCard } from "../../../types/reportCard";
import { useMessaging } from "../../../providers/messaging";
import { ReportCardValidation } from "./validation/reportCardValidation";

const useStyles = makeStyles({
  form: {
    gap: 30,
    maxWidth: 400,
    display: "grid",
  },
});

type ReportCardFormProps = {
  reportCard: ReportCard;
  handleChange(index: keyof ReportCard, value: any): void;
  validation: ReportCardValidation;
};

const ReportCardForm: React.FC<ReportCardFormProps> = ({
  reportCard,
  handleChange,
  validation,
}) => {
  const classes = useStyles();
  const messaging = useMessaging();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api
      .get("/students")
      .then((response) => setStudents(response.data))
      .catch(() =>
        messaging.handleOpen("Não foi possível carregar os estudantes.")
      );
  }, []);

  const inputs = {
    student_id: useRef<HTMLInputElement>(null),
    final_grade: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as [keyof typeof inputs];

    if (!key || !inputs[key]) return;

    inputs[key].current?.focus();
  }, [validation]); // eslint-disable-line

  return (
    <div className={classes.form}>
      <TextField
        select
        inputRef={inputs.student_id}
        error={!!validation.student_id}
        helperText={validation.student_id}
        label="Aluno"
        placeholder="Selecione o aluno"
        margin="normal"
        fullWidth
        value={reportCard.student_id}
      >
        {students.map((item) => (
          <MenuItem
            onClick={() => {
              handleChange("student_id", item.id);
              handleChange("student_id", item.class_school_id);
            }}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        inputRef={inputs.final_grade}
        error={!!validation.final_grade}
        helperText={validation.final_grade}
        label="Nota"
        placeholder="Nota"
        value={reportCard.final_grade}
        onChange={(e) => handleChange("final_grade", e.target.value)}
        fullWidth
        margin="normal"
      />

      <button type="submit" style={{ display: "none" }} />
    </div>
  );
};

export default ReportCardForm;
