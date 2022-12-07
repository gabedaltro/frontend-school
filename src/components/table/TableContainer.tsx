import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { useApp } from "../../hooks/app";
import { TableContextProvider } from "./hook/useTable";
import { TableTemplate } from "../../types/tableTemplate";
import { SIDEBAR_WIDTH } from "../../constants/constants";
import { getTemplateColumns } from "../../helpers/getTemplateColumns";

type TableContainerProps = {
  tableTemplate: TableTemplate[];
  children: ReactNode;
};

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  tableTemplate,
}) => {
  const { windowWidth, isOpenedMenu } = useApp();
  const [template, setTemplate] = useState(tableTemplate);

  const handleChangeTemplate = useCallback((id: string) => {
    setTemplate((template) =>
      template.map((col) => {
        col.notShow = col.id === id ? !col.notShow : col.notShow;
        return col;
      })
    );
  }, []);

  const templateColumns = useMemo(() => {
    const columns = getTemplateColumns(template);
    return columns;
  }, [template]);

  const tableWidth = useMemo(() => {
    const _template = template.filter((col) => !col.notShow);
    const tableWidthInitialValue = 7 * _template.length + 20;
    const width = _template.reduce(
      (sum, item) => sum + item.width,
      tableWidthInitialValue
    );
    if (isOpenedMenu)
      return width > windowWidth - SIDEBAR_WIDTH - 40 ? width : undefined;

    return width > windowWidth - 40 ? width : undefined;
  }, [isOpenedMenu, template, windowWidth]);

  return (
    <TableContextProvider
      value={{
        width: tableWidth,
        tableTemplate: template,
        templateColumns,
        handleChangeTemplate,
      }}
    >
      {children}
    </TableContextProvider>
  );
};

export default TableContainer;
