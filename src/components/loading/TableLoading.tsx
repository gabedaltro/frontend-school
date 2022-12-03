import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  row: {
    height: 35,
    marginBottom: 7,
  },
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
});

const TableLoading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={`animated-background ${classes.row}`} />
      <div className={`animated-background ${classes.row}`} />
      <div className={`animated-background ${classes.row}`} />
      <div className={`animated-background ${classes.row}`} />
    </div>
  );
};

export default TableLoading;
