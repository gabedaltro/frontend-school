import React, { ReactNode } from "react";
import { styled } from "@mui/material";
import { useTable } from "./hook/useTable";

interface HeaderStyleProps {
  templateColumns: string;
  width?: number;
}

const Header = styled("div", {
  shouldForwardProp: (prop) => prop !== "templateColumns",
})<HeaderStyleProps>((props) => ({
  display: "grid",
  gridTemplateColumns: props.templateColumns,
  padding: 10,
  borderBottom: "1px solid #eee",
  flexShrink: 0,
  columnGap: 7,
  width: props.width ? `${props.width}px` : "100%",
}));

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  const { width, templateColumns } = useTable();

  return (
    <Header templateColumns={templateColumns} width={width}>
      {children}
    </Header>
  );
};

export default TableHeader;
