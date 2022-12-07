import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/appbar/Appbar";
import NoData from "../../components/no-data/NoData";
import { useMessaging } from "../../providers/messaging";
import TableLoading from "../../components/loading/TableLoading";
import ModuleLoading from "../../components/loading/ModuleLoading";
import PageHeaderActions from "../../components/page-header/PageHeaderActions";

const useStyles = makeStyles({
  container: {
    gap: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
});

const ReportCard: React.FC = () => {
  const app = useApp();
  const classes = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    api
      .get("/student")
      .then((response) => setStudents(response.data))
      .catch(() => messaging.handleOpen("Não foi possível carregar as notas."))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Appbar title="Boletins" />
      <PageHeaderActions
        title="Boletins"
        description="Gestão dos boletins"
        ActionComponent={
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => history("/report-card/new")}
            >
              Adicionar
            </Button>
          </>
        }
      />

      {loading ? (
        displayMode === "list" ? (
          <TableLoading />
        ) : (
          <ModuleLoading />
        )
      ) : students.length === 0 ? (
        <NoData message="Nenhum boletim encontrado." />
      ) : (
        <>existe</>
      )}
    </>
  );
};

export default ReportCard;
