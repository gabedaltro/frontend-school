import React, { FormEvent, useCallback, useState } from "react";
import ClassroomForm from "../ClassroomForm";
import { useApp } from "../../../../hooks/app";
import { api } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { Class } from "../../../../types/class";
import ClassroomActions from "./ClassroomActions";
import Appbar from "../../../../components/appbar/Appbar";
import Loading from "../../../../components/loading/Loading";
import { useMessaging } from "../../../../providers/messaging";
import { useClassValidation } from "../validation/classValidation";
import PageHeader from "../../../../components/page-header/PageHeader";

const queryParamsInitialValue = {
  name: "",
  school_id: "",
};

const ClassroomNew: React.FC = () => {
  const { school } = useApp();
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const [saving, setSaving] = useState(false);
  const [classroom, setClassroom] = useState<Class>(
    queryParamsInitialValue as Class
  );
  const [validation, setValidation, validate] = useClassValidation();

  const handleChange = useCallback((index: keyof Class, value: any) => {
    setClassroom((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }, []);

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});

    validate(classroom)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => console.error(err.message));
  }

  function handleSubmit() {
    setSaving(true);

    api
      .post("/school-class", { ...classroom, school_id: school?.id })
      .then(() => {
        history("/classroom");
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
        title="Turma"
        ActionsComponent={<ClassroomActions handleSubmit={handleValidation} />}
      />
      <PageHeader title="Nova turma" backUrl="/classroom" />
      <form onSubmit={handleValidation}>
        <ClassroomForm
          handleChange={handleChange}
          class={classroom}
          validation={validation}
        />
      </form>
    </>
  );
};

export default ClassroomNew;
