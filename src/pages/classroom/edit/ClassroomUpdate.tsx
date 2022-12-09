import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Class } from "../../../types/class";
import ClassroomActions from "./ClassroomActions";
import ClassroomForm from "../registration/ClassroomForm";
import Appbar from "../../../components/appbar/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import { useMessaging } from "../../../providers/messaging";
import PageHeader from "../../../components/page-header/PageHeader";
import InsideLoading from "../../../components/loading/InsideLoading";
import { useClassValidation } from "../registration/validation/classValidation";
import DeleteConfirmation from "../../../components/delete-confirmation/DeleteConfirmation";

const ClassroomUpdate: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [classroom, setClassroom] = useState<Class>({} as Class);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [validation, setValidation, validate] = useClassValidation();

  useEffect(() => {
    api
      .get(`/classroom/${id}`)
      .then((response) => {
        setClassroom(response.data);
      })
      .catch(() => handleOpen("Aconteceu um erro no processamento."))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleChange(index: keyof Class, value: any) {
    setClassroom((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});
    validate(classroom)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    api
      .put(`/classroom/${id}`, classroom)
      .then(() => {
        handleOpen("Turma atualizada com sucesso.");
        history("/classroom");
      })
      .catch(() => handleOpen("Aconteceu um erro ao salvar."));
  }

  function handleDelete() {
    setSelectedId("classroom.id");
  }

  async function handleSubmitDelete() {
    api
      .delete(`/classroom/${id}`)
      .then(() => {
        history("/classroom");
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
          onExited={() => setSelectedId(null)}
          description="turma"
          handleSubmit={handleSubmitDelete}
          name={classroom.name}
        />
      )}
      <Appbar
        title="Turma"
        ActionsComponent={
          <ClassroomActions
            handleDelete={handleDelete}
            loading={loading}
            handleSubmit={handleValidation}
          />
        }
      />
      <PageHeader title="Editar turma" backUrl="/classroom" />
      {loading ? (
        <InsideLoading />
      ) : (
        <form onSubmit={handleValidation}>
          <ClassroomForm
            handleChange={handleChange}
            class={classroom}
            validation={validation}
          />
        </form>
      )}
    </>
  );
};

export default ClassroomUpdate;
