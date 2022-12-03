import React from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';

interface useStylesProps {
  gutterBottom: boolean;
}

const useStyles = makeStyles({
  header: ({ gutterBottom }: useStylesProps) => ({
    marginBottom: gutterBottom ? 10 : 0,
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    '@media print': {
      display: 'none',
    },
  }),
  backButton: {
    marginRight: 15,
  },
});

interface PageHeaderProps {
  title: string;
  description?: string;
  gutterBottom?: boolean;
  backUrl?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, gutterBottom = true, backUrl }) => {
  const classes = useStyles({ gutterBottom });
  const navigate = useNavigate();

  return (
    <Grid className={classes.header} item>
      {backUrl && (
        <IconButton className={classes.backButton} size="small" onClick={() => navigate(backUrl)}>
          <ArrowBack />
        </IconButton>
      )}
      <div>
        <Typography variant="h6">{title}</Typography>
        {description && (
          <Typography color="textSecondary" variant="body2">
            {description}
          </Typography>
        )}
      </div>
    </Grid>
  );
};

export default PageHeader;
