import { Dispatch, SetStateAction, useState } from "react";
import { ReportCard } from "../../../../types/reportCard";
import * as yup from "yup";

export type ReportCardValidation = {
  student_id?: string;
  final_grade?: string;
};

type UseReportCardValidation = [
  ReportCardValidation,
  Dispatch<SetStateAction<ReportCardValidation>>,
  (reportCard: ReportCard) => Promise<void>
];

export function useReportCardValidation(): UseReportCardValidation {
  async function handleValidation(reportCard: ReportCard) {
    const schema = yup.object().shape({
      final_grade: yup.string().required("A nota é obrigatória."),
      student_id: yup.string().required("O aluno é obrigatório."),
    });

    try {
      await schema.validate(reportCard);
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

  const [validation, setValidation] = useState<ReportCardValidation>({});
  return [validation, setValidation, handleValidation];
}
