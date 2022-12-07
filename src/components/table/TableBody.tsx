import React, { ReactNode } from 'react';
import { useTable } from './hook/useTable';
import { styled } from '@mui/material';

const Container = styled('div')<{ width?: number }>(props => ({
  overflowX: 'hidden',
  width: props.width ? `${props.width}px` : '100%',
  maxHeight: 'calc(100vh - 374px)',
}));

const Body = styled('div')<{ width?: number }>(props => ({
  width: props.width ? `${props.width}px` : '100%',
}));

type TableBodyProps = {
  width?: number;
  minHeight?: number;
  children: ReactNode;
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  const { width } = useTable();

  return (
    <Container width={width}>
      <Body width={width}>{children}</Body>
    </Container>
  );
};

export default TableBody;
