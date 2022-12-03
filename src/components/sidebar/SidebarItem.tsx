import React from "react";
import { makeStyles } from "@mui/styles";
import { useApp } from "../../hooks/app";
import CustomNavLink from "./CustomNavLink";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemProps,
  Theme,
  useTheme,
} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  listItemIcon: {
    color: theme.palette.primary.contrastText,
  },
  listItemText: {
    color: "#fff",
    fontSize: 14,
  },
  nested: (props: { nested: number }) => ({
    paddingLeft: props.nested ? theme.spacing(props.nested) : 16,
    borderLeft: "2px solid transparent",
    minHeight: 50,
    display: "flex",
  }),
}));

interface SidebarItemProps extends ListItemProps {
  to?: string;
  text: string;
  nested?: number;
  icon: React.ReactElement;
  onClick?: () => void | null;
  isLink?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  text,
  nested = 0,
  onClick,
  isLink = true,
  className,
  ...rest
}) => {
  const classes = useStyles({ nested });
  const theme = useTheme();
  const app = useApp();

  function handleClick() {
    if (app.isMobile || app.windowWidth <= 1280) app.handleOpenMenu();
  }

  return (
    <ListItem
      {...rest}
      component={isLink ? CustomNavLink : "div"}
      to={to}
      onClick={onClick || handleClick}
      className={`${classes.nested} ${className}`}
      style={{ paddingLeft: nested ? theme.spacing(nested) : 16 }}
    >
      <ListItemIcon className={classes.listItemIcon} style={{ color: "white" }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={text}
      />
    </ListItem>
  );
};

export default SidebarItem;
