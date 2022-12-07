import React from 'react';
import { ListItemButtonProps, ListItemButton as NativeListItemButton, styled } from '@mui/material';

const ListItemStyled = styled(NativeListItemButton)(props => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: '1px solid #f5f5f5',
  backgroundColor: '#fff',
}));

const ListItem: React.FC<ListItemButtonProps> = props => {
  return <ListItemStyled {...props} />;
};

export default ListItem;
