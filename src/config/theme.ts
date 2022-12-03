import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#30519f',
    },
    secondary: {
      main: '#f68c32',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '"Montserrat"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 500,
        },
        h5: {
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#272c3a',
          border: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiTabs: {
      defaultProps: {
        indicatorColor: 'secondary',
        textColor: 'inherit',
      },
    },
  },
});

export { theme };
