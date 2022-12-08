import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../../services/api";
import ReportCardActions from "./ReportCardActions";
import { ReportCard } from "../../../types/reportCard";
import Appbar from "../../../components/appbar/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import ReportCardForm from "../registration/ReportCardForm";
import { useMessaging } from "../../../providers/messaging";
import PageHeader from "../../../components/page-header/PageHeader";
import InsideLoading from "../../../components/loading/InsideLoading";
import { useReportCardValidation } from "../registration/validation/reportCardValidation";

const ReportCardUpdate: React.FC = () => {
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [reportCard, setReportCard] = useState<ReportCard>({} as ReportCard);
  const [validation, setValidation, validate] = useReportCardValidation();

  useEffect(() => {
    api
      .get(`/grade/${id}`)
      .then((response) => {
        setReportCard(response.data);
      })
      .catch(() => handleOpen("Aconteceu um erro no processamento."))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleChange(index: keyof ReportCard, value: any) {
    setReportCard((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});
    validate(reportCard)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    api
      .put(`/report-card/${id}`, reportCard)
      .then(() => {
        handleOpen("Boletim atualizado com sucesso.");
        history("/report-card");
      })
      .catch(() => handleOpen("Aconteceu um erro ao salvar."));
  }

  return (
    <>
      <Appbar
        title="Boletim"
        ActionsComponent={
          <ReportCardActions
            loading={loading}
            handleSubmit={handleValidation}
          />
        }
      />
      <PageHeader title="Editar turma" backUrl="/reportCard" />
      {loading ? (
        <InsideLoading />
      ) : (
        <form onSubmit={handleValidation}>
          <ReportCardForm
            handleChange={handleChange}
            reportCard={reportCard}
            validation={validation}
          />
        </form>
      )}
    </>
  );
};

export default ReportCardUpdate;
