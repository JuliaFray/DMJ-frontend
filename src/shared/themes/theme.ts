import palette from "shared/themes/palette.module.scss";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
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
      dark: "rgba(0, 0, 0, 0.54)",
    },
  },
  typography: {
    fontSize: 14,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          lineHeight: "1em",
          top: "-10px!important",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "50px",
          borderRadius: "2em !important",
        },
        input: {
          height: "50px",
          padding: "0 10px !important",
          borderRadius: "2em",
        },
        focused: {
          border: "1px solid rgb(3,154,154)",
          borderRadius: "2em",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          marginTop: "10px",
        },
        required: {
          color: "red",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        inputRoot: {
          height: "max-content",
        },
        input: {
          height: "40px",
          padding: "0 !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "40px",
          borderRadius: "2em",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        filledSecondary: {
          color: "#fff",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          height: "20px",
          marginBottom: "-20px",
          marginTop: "0",
        },
      },
    },
  },
});
