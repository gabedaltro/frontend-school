import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportCardItemTable from "./ReportCardItemTable";
import { ReportCard } from "../../../../types/reportCard";
import { usePagination } from "../../../../hooks/pagination";
import TableRow from "../../../../components/table/TableRow";
import { OrderIndexData } from "../../../../hooks/tableOrder";
import TableBody from "../../../../components/table/TableBody";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import TableHeader from "../../../../components/table/TableHeader";
import TableContent from "../../../../components/table/TableContent";
import { useTable } from "../../../../components/table/hook/useTable";

const useStyles = makeStyles({
  headerItem: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& > svg": {
      marginLeft: 10,
      fontSize: 20,
    },
  },
  headerItemNumeric: {
    justifyContent: "flex-end",
    marginRight: 20,
  },
});

type ReportCardListTableProps = {
  reportCards: ReportCard[];
  handleSort(index: string): void;
  orderedIndex: OrderIndexData;
};

const ReportCardListTable: React.FC<ReportCardListTableProps> = ({
  reportCards,
  handleSort,
  orderedIndex,
}) => {
  const classes = useStyles();
  const history = useNavigate();
  const { tableTemplate } = useTable();
  const { rowsPerPage, page } = usePagination();

  return (
    <>
      <TableContent>
        <TableHeader>
          {tableTemplate.map((item) => (
            <div
              className={
                item.dataType === "number"
                  ? `${classes.headerItem} ${classes.headerItemNumeric}`
                  : classes.headerItem
              }
              key={item.id}
              onClick={
                !item.notFilterable
                  ? () => handleSort(item.originalId)
                  : undefined
              }
            >
              <Typography variant="caption" color="primary">
                {item.description}
              </Typography>
              {orderedIndex.index === item.originalId && (
                <>
                  {orderedIndex.direction === "asc" ? (
                    <ArrowUpward color="primary" />
                  ) : (
                    <ArrowDownward color="primary" />
                  )}
                </>
              )}
            </div>
          ))}
        </TableHeader>
        <TableBody>
          {reportCards
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((reportCard) => (
              <TableRow
                key={reportCard.id}
                onClick={() => history(`/report-card/${reportCard.id}`)}
              >
                <ReportCardItemTable reportCard={reportCard} />
              </TableRow>
            ))}
        </TableBody>
      </TableContent>
    </>
  );
};

export default ReportCardListTable;
