import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../../services/api";
import TeacherActions from "./TeacherActions";
import { Teacher } from "../../../types/teacher";
import TeacherForm from "../registration/TeacherForm";
import Appbar from "../../../components/appbar/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import { useMessaging } from "../../../providers/messaging";
import PageHeader from "../../../components/page-header/PageHeader";
import InsideLoading from "../../../components/loading/InsideLoading";
import { useTeacherValidation } from "../registration/validation/teacherValidation";
import DeleteConfirmation from "../../../components/delete-confirmation/DeleteConfirmation";

const TeacherUpdate: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher>({} as Teacher);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [validation, setValidation, validate] = useTeacherValidation();

  useEffect(() => {
    api
      .get(`/teacher/${id}`)
      .then((response) => {
        setTeacher(response.data);
      })
      .catch(() => handleOpen("Aconteceu um erro no processamento."))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleChange(index: keyof Teacher, value: any) {
    setTeacher((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});
    validate(teacher)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    api
      .put(`/teacher/${id}`, teacher)
      .then(() => {
        handleOpen("Professor atualizado com sucesso.");
        history("/teacher");
      })
      .catch(() => handleOpen("Aconteceu um erro ao salvar."));
  }

  function handleDelete() {
    setSelectedId(teacher.id);
  }

  async function handleSubmitDelete() {
    api
      .delete(`/teacher/${id}`)
      .then(() => {
        history("/teachers");
        handleOpen("Excluído");
      })
      .catch(() => {
        handleOpen("Não foi possível excluir o registro.");
      });
  }

  return (
    <>
      {selectedId && (
        <DeleteConfirmation
          onExited={() => setSelectedId("")}
          description="professor"
          handleSubmit={handleSubmitDelete}
          name={teacher.name}
        />
      )}
      <Appbar
        title="Professor"
        ActionsComponent={
          <TeacherActions
            handleDelete={handleDelete}
            loading={loading}
            handleSubmit={handleValidation}
          />
        }
      />
      <PageHeader title="Editar professor" backUrl="/teachers" />
      {loading ? (
        <InsideLoading />
      ) : (
        <form onSubmit={handleValidation}>
          <TeacherForm
            handleChange={handleChange}
            teacher={teacher}
            validation={validation}
          />
        </form>
      )}
    </>
  );
};

export default TeacherUpdate;
