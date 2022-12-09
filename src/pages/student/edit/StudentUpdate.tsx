import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../../services/api";
import StudentActions from "./StudentActions";
import { Student } from "../../../types/student";
import StudentForm from "../registration/StudentForm";
import Appbar from "../../../components/appbar/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import { useMessaging } from "../../../providers/messaging";
import PageHeader from "../../../components/page-header/PageHeader";
import InsideLoading from "../../../components/loading/InsideLoading";
import { useStudentValidation } from "../registration/validation/studentValidation";
import DeleteConfirmation from "../../../components/delete-confirmation/DeleteConfirmation";

const StudentUpdate: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student>({} as Student);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [validation, setValidation, validate] = useStudentValidation();

  useEffect(() => {
    api
      .get(`/student/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch(() => handleOpen("Aconteceu um erro no processamento."))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleChange(index: keyof Student, value: any) {
    setStudent((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});
    validate(student)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    api
      .put(`/student/${id}`, student)
      .then(() => {
        handleOpen("Aluno atualizado com sucesso.");
        history("/student");
      })
      .catch(() => handleOpen("Aconteceu um erro ao salvar."));
  }

  function handleDelete() {
    setSelectedId(student.id);
  }

  async function handleSubmitDelete() {
    api
      .delete(`/student/${id}`)
      .then(() => {
        history("/student");
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
          description="aluno"
          handleSubmit={handleSubmitDelete}
          name={student.name}
        />
      )}
      <Appbar
        title="Aluno"
        ActionsComponent={
          <StudentActions
            handleDelete={handleDelete}
            loading={loading}
            handleSubmit={handleValidation}
          />
        }
      />
      <PageHeader title="Editar aluno" backUrl="/students" />
      {loading ? (
        <InsideLoading />
      ) : (
        <form onSubmit={handleValidation}>
          <StudentForm
            type="edit"
            handleChange={handleChange}
            student={student}
            validation={validation}
          />
        </form>
      )}
    </>
  );
};

export default StudentUpdate;
