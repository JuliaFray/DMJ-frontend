import {createTheme} from '@mui/material';
import palette from './palette.module.scss';

export const theme = createTheme({
    palette: {
        primary: {
            main: palette.primary
        },
        secondary: {
            main: palette.secondary
        },
        error: {
            main: palette.error
        },
        warning: {
            main: palette.warning
        },
        info: {
            main: palette.info
        },
        success: {
            main: palette.success,
            dark: 'rgba(0, 0, 0, 0.54)'
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
                    lineHeight: '1em',
                    top: '-3px!important',
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(159, 237, 215, 0.05)',
                    height: '40px'
                },
                input: {
                    height: '40px',
                    padding: '0 15px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(159, 237, 215, 0.05)',
                    height: '40px'
                },
                input: {
                    height: '40px',
                    padding: '0 15px'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
                inputRoot:{
                    height: 'max-content',
                },
                input: {
                    height: '40px',
                    padding: '0 !important'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: '40px'
                }
            }
        },
    }
});
