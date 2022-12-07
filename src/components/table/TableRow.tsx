import React from 'react';
import { ListItemButton, styled, ListItemButtonProps } from '@mui/material';
import { useTable } from './hook/useTable';

interface RowStyleProps {
  templateColumns: string;
  width?: number;
}

const Row = styled(ListItemButton, { shouldForwardProp: prop => prop !== 'templateColumns' })<RowStyleProps>(props => ({
  display: 'grid',
  gridTemplateColumns: props.templateColumns,
  padding: '5px 10px',
  minHeight: 40,
  gridAutoFlow: 'row',
  flexShrink: 0,
  borderBottom: '1px solid #f5f5f5',
  columnGap: 7,
  width: props.width ? `${props.width}px` : '100%',
}));

const TableRow: React.FC<ListItemButtonProps> = ({ children, onClick, ...rest }) => {
  const { width, templateColumns } = useTable();

  return (
    <Row width={width} templateColumns={templateColumns} {...rest} onClick={onClick}>
      {children}
    </Row>
  );
};

export default TableRow;
