import * as yup from "yup";
import { Class } from "../../../../types/class";
import { Dispatch, SetStateAction, useState } from "react";

export type ClassValidation = {
  name?: string;
};

type UseClassValidation = [
  ClassValidation,
  Dispatch<SetStateAction<ClassValidation>>,
  (classroom: Class) => Promise<void>
];

export function useClassValidation(): UseClassValidation {
  async function handleValidation(classroom: Class) {
    const schema = yup.object().shape({
      name: yup.string().required("O nome da turma é obrigatória"),
    });

    try {
      await schema.validate(classroom);
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

  const [validation, setValidation] = useState<ClassValidation>({});
  return [validation, setValidation, handleValidation];
}
