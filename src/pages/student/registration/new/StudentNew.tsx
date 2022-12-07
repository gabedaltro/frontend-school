import React, { FormEvent, useCallback, useState } from "react";
import { AxiosError } from "axios";
import StudentForm from "../StudentForm";
import { api } from "../../../../services/api";
import StudentActions from "./StudentActions";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../types/student";
import Appbar from "../../../../components/appbar/Appbar";
import Loading from "../../../../components/loading/Loading";
import { useMessaging } from "../../../../providers/messaging";
import PageHeader from "../../../../components/page-header/PageHeader";
import { useStudentValidation } from "../validation/studentValidation";

const queryParamsInitialValue: Student = {
  id: "",
  class_school_id: "",
  name: "",
  document: "",
  registration_number: undefined,
  module: 1,
};

const StudentNew: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const [saving, setSaving] = useState(false);
  const [student, setStudent] = useState<Student>(
    queryParamsInitialValue as Student
  );
  const [validation, setValidation, validate] = useStudentValidation();

  const handleChange = useCallback((index: keyof Student, value: any) => {
    setStudent((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }, []);

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});

    validate(student)
      .then(() => {
        handleSubmit();
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  }

  function handleSubmit() {
    setSaving(true);

    api
      .post("/students", student)
      .then(() => {
        setSaving(false);
        history("/students");
      })
      .catch(() => {
        handleOpen("Não foi possível criar um novo registro.");
      });
  }

  return (
    <>
      {saving && <Loading />}
      <Appbar
        title="Aluno"
        ActionsComponent={<StudentActions handleSubmit={handleValidation} />}
      />
      <PageHeader title="Novo aluno" backUrl="/students" />
      <form onSubmit={handleValidation}>
        <StudentForm
          type="new"
          handleChange={handleChange}
          student={student}
          validation={validation}
        />
      </form>
    </>
  );
};

export default StudentNew;
