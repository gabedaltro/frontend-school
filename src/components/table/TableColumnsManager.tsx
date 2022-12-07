import { IconButton, Menu, MenuItem, Switch, Theme, Tooltip, Typography } from '@mui/material';
import { ViewColumn } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, { MouseEvent, useState } from 'react';
import { useTable } from './hook/useTable';

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    padding: 0,
    margin: '7px 0',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 10px 0 20px',
  },
  checkBox: {
    padding: 0,
    marginLeft: 10,
  },
  container: {
    paddingLeft: 10,
    marginLeft: 10,
    borderLeft: '1px solid #f5f5f5',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const TableColumnsManager: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { tableTemplate, handleChangeTemplate } = useTable();

  function handleClick(templateColId: string, event?: MouseEvent<HTMLLIElement>) {
    event?.stopPropagation();
    handleChangeTemplate(templateColId);
  }

  return (
    <div className={classes.container}>
      <Menu
        classes={{ list: classes.menu }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {tableTemplate.map(col => (
          <MenuItem className={classes.menuItem} key={col.id} onClick={e => handleClick(col.id, e)}>
            <Typography variant="body2">{col.description}</Typography>
            <Switch color="primary" checked={!col.notShow} />
          </MenuItem>
        ))}
      </Menu>
      <Tooltip title="Mostrar ou ocultar colunas">
        <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
          <ViewColumn />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default TableColumnsManager;
