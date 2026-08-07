import { createTheme } from '@mui/material';

// eslint-disable-next-line no-restricted-imports
import palette from './palette.module.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      contrastText: palette.white,
    },
    secondary: {
      main: palette.secondary,
      contrastText: palette.white,
    },
    error: {
      main: palette.error,
    },
    warning: {
      main: palette.warning,
    },
    info: {
      main: palette.info,
    },
    success: {
      main: palette.success,
      dark: 'rgba(0, 0, 0, 0.54)',
    },
  },
  typography: {
    fontSize: 14,
    fontWeightRegular: 'normal',
    fontFamily: 'Gros Ventre Regular',
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          lineHeight: '1em',
          top: '0px!important',
          '&.Mui-focused': {
            top: '-5px!important',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            border: '1px solid rgb(3,154,154)',
          },
          height: '50px',
          borderRadius: '5px !important',
        },
        input: {
          height: '50px',
          padding: '0 10px !important',
          borderRadius: '5px !important',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        inputRoot: {
          height: 'max-content',
        },
        input: {
          height: '40px',
          padding: '0 !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '50px',
          borderRadius: '5px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filledSecondary: {
          color: '#fff',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          height: '20px',
          marginBottom: '-20px',
          marginTop: '0',
        },
      },
    },
  },
});
