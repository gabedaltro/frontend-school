import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink as NavLinkNative } from 'react-router-dom';

const styles = makeStyles<Theme>(theme => ({
  listItemActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderLeft: `2px solid ${theme.palette.secondary.light}!important`,
    transition: 'border-color 0.5s ease',
    '& svg': {
      color: theme.palette.secondary.main,
      transition: 'color 0.5s ease',
    },
  },
}));

const NavLink: React.ForwardRefRenderFunction<any, any> = ({ className, ...rest }, ref) => {
  const classes = styles();
  return (
    <NavLinkNative
      ref={ref}
      {...rest}
      className={state => (state.isActive ? `${className} ${classes.listItemActive}` : className)}
    />
  );
};

export default React.forwardRef(NavLink);
