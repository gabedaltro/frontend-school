import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Student } from "../../types/student";
import { Teacher } from "../../types/teacher";
import { useNavigate } from "react-router-dom";
import Appbar from "../../components/appbar/Appbar";
import NoData from "../../components/no-data/NoData";
import { useMessaging } from "../../providers/messaging";
import TableLoading from "../../components/loading/TableLoading";
import ModuleLoading from "../../components/loading/ModuleLoading";
import PageHeaderActions from "../../components/page-header/PageHeaderActions";
import useTableOrder from "../../hooks/tableOrder";
import TableContainer from "../../components/table/TableContainer";
import PaginationProvider from "../../hooks/pagination";
import Pagination from "../../components/pagination/Pagination";
import { teacherTableTemplate } from "./teacherTableTemplate";
import TeacherListTable from "./list/table/TeacherListTable";
import TeacherListModule from "./list/module/TeacherListModule";

const useStyles = makeStyles({
  container: {
    gap: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
});

const TeacherPage: React.FC = () => {
  const app = useApp();
  const classes = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [orderedIndex, sort] = useTableOrder();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filtered, setFiltered] = useState<Teacher[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    setFiltered(teachers);
  }, [teachers]);

  useEffect(() => {
    api
      .get("/teacher")
      .then((response) => setTeachers(response.data))
      .catch(() =>
        messaging.handleOpen("Não foi possível carregar os professores.")
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleSort(index: string) {
    const p = sort(index, filtered);
    setFiltered(p);
  }

  return (
    <>
      <Appbar title="Professores" />
      <PageHeaderActions
        title="Professores"
        description="Gestão dos professores"
        ActionComponent={
          <>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => history("/teacher/new")}
            >
              Adicionar
            </Button>
          </>
        }
      />

      <TableContainer tableTemplate={teacherTableTemplate}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : filtered.length === 0 ? (
          <NoData message="Nenhum professor cadastrado." />
        ) : (
          <PaginationProvider>
            <div className={classes.container}>
              {displayMode === "list" ? (
                <TeacherListTable
                  teachers={filtered}
                  handleSort={handleSort}
                  orderedIndex={orderedIndex}
                />
              ) : (
                displayMode === "module" && (
                  <TeacherListModule teachers={filtered} />
                )
              )}
              <Pagination count={filtered.length} />
            </div>
          </PaginationProvider>
        )}
      </TableContainer>
    </>
  );
};

export default TeacherPage;
