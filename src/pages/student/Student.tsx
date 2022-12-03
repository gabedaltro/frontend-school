import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/appbar/Appbar";
import PageHeaderActions from "../../components/page-header/PageHeaderActions";
import { useMessaging } from "../../providers/messaging";
import TableLoading from "../../components/loading/TableLoading";
import ModuleLoading from "../../components/loading/ModuleLoading";
import NoData from "../../components/no-data/NoData";

const useStyles = makeStyles({
  container: {
    gap: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
});

const StudentPage: React.FC = () => {
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
      .catch(() =>
        messaging.handleOpen("Não foi possível carregar os estudantes")
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Appbar title="Turma" />
      <PageHeaderActions
        title="Turmas"
        description="Gestão das classes"
        ActionComponent={
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => history("/student/new")}
            >
              Adicionar
            </Button>
          </>
        }
      />

      <div className={classes.container}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : students.length === 0 ? (
          <NoData message="Nenhum aluno matriculado" />
        ) : (
          <>existe</>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
