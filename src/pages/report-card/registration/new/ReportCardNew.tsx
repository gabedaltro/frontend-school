import React, { FormEvent, useCallback, useState } from "react";
import ReportCardForm from "../ReportCardForm";
import { useApp } from "../../../../hooks/app";
import { api } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import ReportCardActions from "./ReportCardActions";
import { ReportCard } from "../../../../types/reportCard";
import Appbar from "../../../../components/appbar/Appbar";
import Loading from "../../../../components/loading/Loading";
import { useMessaging } from "../../../../providers/messaging";
import PageHeader from "../../../../components/page-header/PageHeader";
import { useReportCardValidation } from "../validation/reportCardValidation";

const queryParamsInitialValue = {
  classroom_id: "",
  student_id: "",
  final_grade: Math.floor(Math.random() * 10 + 1),
};

const ReportCardNew: React.FC = () => {
  const { school } = useApp();
  const history = useNavigate();
  const { handleOpen } = useMessaging();
  const [saving, setSaving] = useState(false);
  const [reportCard, setReportCard] = useState<ReportCard>(
    queryParamsInitialValue as ReportCard
  );
  const [validation, setValidation, validate] = useReportCardValidation();

  const handleChange = useCallback((index: keyof ReportCard, value: any) => {
    setReportCard((oldValue) => ({
      ...oldValue,
      [index]: value,
    }));
  }, []);

  function handleValidation(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setValidation({});

    validate(reportCard)
      .then(() => {
        handleSubmit();
      })
      .catch((err) => console.error(err.message));
  }

  function handleSubmit() {
    setSaving(true);

    api
      .post("/reportCard", reportCard)
      .then(() => {
        history("/report-card");
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
        title="Boletim"
        ActionsComponent={<ReportCardActions handleSubmit={handleValidation} />}
      />
      <PageHeader title="Novo boletim" backUrl="/report-card" />
      <form onSubmit={handleValidation}>
        <ReportCardForm
          handleChange={handleChange}
          reportCard={reportCard}
          validation={validation}
        />
      </form>
    </>
  );
};

export default ReportCardNew;
