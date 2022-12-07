import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { Class } from "../../types/class";
import { useNavigate } from "react-router-dom";
import useTableOrder from "../../hooks/tableOrder";
import Appbar from "../../components/appbar/Appbar";
import NoData from "../../components/no-data/NoData";
import { useMessaging } from "../../providers/messaging";
import PaginationProvider from "../../hooks/pagination";
import Pagination from "../../components/pagination/Pagination";
import ClassroomListTable from "./list/table/ClassroomListTable";
import TableLoading from "../../components/loading/TableLoading";
import { classroomTableTemplate } from "./classroomTableTemplate";
import ModuleLoading from "../../components/loading/ModuleLoading";
import TableContainer from "../../components/table/TableContainer";
import ClassroomListModule from "./list/module/ClassroomListModule";
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
  const classes = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [orderedIndex, sort] = useTableOrder();
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState<Class[]>([]);
  const [classrooms, setClassrooms] = useState<Class[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    setFiltered(classrooms);
  }, [classrooms]);

  useEffect(() => {
    api
      .get("/school-class")
      .then((response) => setClassrooms(response.data.school_class))
      .catch(() => messaging.handleOpen("Não foi possível carregar as turmas."))
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

      <TableContainer tableTemplate={classroomTableTemplate}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : filtered.length === 0 ? (
          <NoData message="Nenhuma turma cadastrada." />
        ) : (
          <PaginationProvider>
            <div className={classes.container}>
              {displayMode === "list" ? (
                <ClassroomListTable
                  classrooms={filtered}
                  handleSort={handleSort}
                  orderedIndex={orderedIndex}
                />
              ) : (
                displayMode === "module" && (
                  <ClassroomListModule classrooms={filtered} />
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

export default Classroom;
