import { Dispatch, SetStateAction, useState } from "react";
import { Teacher } from "../../../../types/teacher";
import * as yup from "yup";

export type TeacherValidation = {
  name?: string;
  document?: string;
  discipline?: string;
  academic_title?: string;
};

type UseTeacherValidation = [
  TeacherValidation,
  Dispatch<SetStateAction<TeacherValidation>>,
  (teacher: Teacher) => Promise<void>
];

export function useTeacherValidation(): UseTeacherValidation {
  async function handleValidation(teacher: Teacher) {
    const schema = yup.object().shape({
      academic_title: yup.string().required("O título é obrigatório"),
      document: yup.string().required("O documento é obrigatório"),
      discipline: yup.string().required("A disciplina é obrigatória"),
      name: yup.string().required("O nome do professor é obrigatório"),
    });

    try {
      await schema.validate(teacher);
    } catch (err) {
      const error = err as yup.ValidationError;
      if (error.path && error.message) {
        setValidation({
          [error.path]: error.message,
        });
      }
      throw new Error(error.message);
    }
  }

  const [validation, setValidation] = useState<TeacherValidation>({});
  return [validation, setValidation, handleValidation];
}
