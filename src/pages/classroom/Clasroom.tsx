import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Class } from "../../types/class";
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

const Classroom: React.FC = () => {
  const app = useApp();
  const classesStyles = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    api
      .get("/student")
      .then((response) => setClasses(response.data))
      .catch(() => messaging.handleOpen("Não foi possível carregar as turmas."))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Appbar title="Turmas" />
      <PageHeaderActions
        title="Turmas"
        description="Gestão das turmas"
        ActionComponent={
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => history("/classroom/new")}
            >
              Adicionar
            </Button>
          </>
        }
      />

      <div className={classesStyles.container}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : classes.length === 0 ? (
          <NoData message="Nenhuma turma cadastrada." />
        ) : (
          <>existe</>
        )}
      </div>
    </div>
  );
};

export default Classroom;
