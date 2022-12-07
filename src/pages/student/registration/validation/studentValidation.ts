import * as yup from "yup";
import { Student } from "../../../../types/student";
import { Dispatch, SetStateAction, useState } from "react";

export type StudentValidation = {
  name?: string;
  class?: string;
  document?: string;
  module?: string;
  registration_number?: string;
};

type UseStudentValidation = [
  StudentValidation,
  Dispatch<SetStateAction<StudentValidation>>,
  (student: Student) => Promise<void>
];

export function useStudentValidation(): UseStudentValidation {
  async function handleValidation(student: Student) {
    const schema = yup.object().shape({
      module: yup.string().required("O módulo é obrigatório"),
      registration_number: yup
        .string()
        .required("O número de registro é obrigatório"),
      document: yup.string().required("O documento é obrigatório"),
      class: yup.string().required("A turma é obrigatória"),
      name: yup.string().required("O nome do aluno é obrigatório"),
    });

    try {
      await schema.validate(student);
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

  const [validation, setValidation] = useState<StudentValidation>({});
  return [validation, setValidation, handleValidation];
}
