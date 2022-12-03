import React from 'react';
import { makeStyles } from '@mui/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, Theme, useTheme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  listItemIcon: {
    color: theme.palette.primary.contrastText,
  },
  listItemText: {
    color: '#fff',
    fontSize: 14,
  },
  expandColor: {
    color: '#fff',
  },
  nested: (props: { nested: number }) => ({
    paddingLeft: props.nested ? theme.spacing(props.nested) : 16,
    borderLeft: '2px solid transparent',
    minHeight: 50,
  }),
}));

interface SidebarItemProps {
  text: string;
  icon: React.ReactElement;
  opened: boolean;
  onClick: () => void;
  nested?: number;
}

const SidebarItemExpendable: React.FC<SidebarItemProps> = ({ icon, text, opened, onClick, nested = 0 }) => {
  const classes = useStyles({ nested });
  const theme = useTheme();

  return (
    <ListItemButton
      onClick={onClick}
      style={{ paddingLeft: nested ? theme.spacing(nested) : 16 }}
      className={classes.nested}
    >
      <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
      <ListItemText classes={{ primary: classes.listItemText }} primary={text} />
      {opened ? <ExpandLess className={classes.expandColor} /> : <ExpandMore className={classes.expandColor} />}
    </ListItemButton>
  );
};

export default SidebarItemExpendable;
