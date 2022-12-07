import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";
import useTableOrder from "../../hooks/tableOrder";
import Appbar from "../../components/appbar/Appbar";
import NoData from "../../components/no-data/NoData";
import PaginationProvider from "../../hooks/pagination";
import { useMessaging } from "../../providers/messaging";
import StudentListTable from "./list/table/StudentListTable";
import { studentTableTemplate } from "./studentTableTemplate";
import StudentListModule from "./list/module/StudentListModule";
import Pagination from "../../components/pagination/Pagination";
import TableLoading from "../../components/loading/TableLoading";
import TableContainer from "../../components/table/TableContainer";
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

const StudentPage: React.FC = () => {
  const app = useApp();
  const classes = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [orderedIndex, sort] = useTableOrder();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    setFiltered(students);
  }, [students]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/student")
      .then((response) => setStudents(response.data))
      .catch(() =>
        messaging.handleOpen("Não foi possível carregar os estudantes.")
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
      <Appbar title="Alunos" />
      <PageHeaderActions
        title="Alunos"
        description="Gestão dos alunos"
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

      <TableContainer tableTemplate={studentTableTemplate}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : students.length === 0 ? (
          <NoData message="Nenhum aluno matriculado." />
        ) : (
          <PaginationProvider>
            <div className={classes.container}>
              {displayMode === "list" ? (
                <StudentListTable
                  students={filtered}
                  handleSort={handleSort}
                  orderedIndex={orderedIndex}
                />
              ) : (
                displayMode === "module" && (
                  <StudentListModule students={filtered} />
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

export default StudentPage;
