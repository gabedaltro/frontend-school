import React, { FormEvent, useCallback, useState } from "react";
import { AxiosError } from "axios";
import TeacherForm from "../TeacherForm";
import { api } from "../../../../services/api";
import TeacherActions from "./TeacherActions";
import { useNavigate } from "react-router-dom";
import { Teacher } from "../../../../types/teacher";
import Appbar from "../../../../components/appbar/Appbar";
import Loading from "../../../../components/loading/Loading";
import { useMessaging } from "../../../../providers/messaging";
import PageHeader from "../../../../components/page-header/PageHeader";
import { useTeacherValidation } from "../validation/teacherValidation";

const queryParamsInitialValue = {
  academic_title: "",
  discipline_teaches: "",
  document: "",
  name: "",
  class_school_id: "",
};

const TeacherNew: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const [saving, setSaving] = useState(false);
  const [teacher, setTeacher] = useState<Teacher>(
    queryParamsInitialValue as Teacher
  );
  const [validation, setValidation, validate] = useTeacherValidation();

  const handleChange = useCallback((index: keyof Teacher, value: any) => {
    setTeacher((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }, []);

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});

    validate(teacher)
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
      .post("/teachers", teacher)
      .then(() => {
        history("/teachers");
      })
      .catch(() => {
        handleOpen("Não foi possível criar um novo registro.");
      })
      .finally(() => setSaving(false));
  }

  return (
    <>
      {saving && <Loading />}
      <Appbar
        title="Professor"
        ActionsComponent={<TeacherActions handleSubmit={handleValidation} />}
      />
      <PageHeader title="Novo professor" backUrl="/teachers" />
      <form onSubmit={handleValidation}>
        <TeacherForm
          handleChange={handleChange}
          teacher={teacher}
          validation={validation}
        />
      </form>
    </>
  );
};

export default TeacherNew;
