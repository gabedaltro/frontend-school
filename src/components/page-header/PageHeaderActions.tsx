import React, { ReactElement } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, styled, Theme, Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  actions: {
    '& button + button': {
      marginLeft: 7,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  backButton: {
    marginRight: 15,
  },
}));

interface ContainerStyleProps {
  gutterBottom: boolean;
}

const Container = styled('div', {
  shouldForwardProp: prop => prop !== 'gutterBottom',
})<ContainerStyleProps>(({ gutterBottom }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: gutterBottom ? 20 : 0,
  '@media print': {
    display: 'none',
  },
}));

interface PageHeaderActionsProps {
  title: string;
  description?: string;
  gutterBottom?: boolean;
  ActionComponent?: ReactElement;
  backUrl?: string;
}

const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
  title,
  description,
  gutterBottom = true,
  ActionComponent,
  backUrl,
}) => {
  const classes = useStyles({ gutterBottom });
  const navigate = useNavigate();

  return (
    <Container gutterBottom={gutterBottom}>
      <div className={classes.content}>
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
      </div>

      {ActionComponent && <div className={classes.actions}>{ActionComponent}</div>}
    </Container>
  );
};

export default PageHeaderActions;
