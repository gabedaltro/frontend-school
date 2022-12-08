import React, { useEffect, useState } from "react";
import { Button, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import useTableOrder from "../../hooks/tableOrder";
import { ReportCard } from "../../types/reportCard";
import Appbar from "../../components/appbar/Appbar";
import NoData from "../../components/no-data/NoData";
import PaginationProvider from "../../hooks/pagination";
import { useMessaging } from "../../providers/messaging";
import TableLoading from "../../components/loading/TableLoading";
import ModuleLoading from "../../components/loading/ModuleLoading";
import ReportCardListTable from "./list/table/ReportCardListTable";
import TableContainer from "../../components/table/TableContainer";
import { reportCardTableTemplate } from "./reportCardTableTemplate";
import ReportCardListModule from "./list/module/ReportCardListModule";
import PageHeaderActions from "../../components/page-header/PageHeaderActions";

const useStyles = makeStyles({
  container: {
    gap: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
});

const ReportCardPage: React.FC = () => {
  const app = useApp();
  const classes = useStyles();
  const history = useNavigate();
  const messaging = useMessaging();
  const [orderedIndex, sort] = useTableOrder();
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState<ReportCard[]>([]);
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [displayMode, setDisplayMode] = useState<"list" | "module">("list");

  useEffect(() => {
    setDisplayMode(app.isMobile || app.windowWidth < 930 ? "module" : "list");
  }, [app.isMobile, app.windowWidth]);

  useEffect(() => {
    setFiltered(reportCards);
  }, [reportCards]);

  useEffect(() => {
    api
      .get("/grade")
      .then((response) => setReportCards(response.data))
      .catch(() => messaging.handleOpen("Não foi possível carregar as notas."))
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

      <TableContainer tableTemplate={reportCardTableTemplate}>
        {loading ? (
          displayMode === "list" ? (
            <TableLoading />
          ) : (
            <ModuleLoading />
          )
        ) : filtered.length === 0 ? (
          <NoData message="Nenhum boletim encontrado." />
        ) : (
          <PaginationProvider>
            <div className={classes.container}>
              {displayMode === "list" ? (
                <ReportCardListTable
                  reportCards={filtered}
                  handleSort={handleSort}
                  orderedIndex={orderedIndex}
                />
              ) : (
                displayMode === "module" && (
                  <ReportCardListModule reportCards={filtered} />
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

export default ReportCardPage;
