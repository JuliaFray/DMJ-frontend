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
                    backgroundColor: 'rgba(159, 237, 215, 0.1)',
                    borderRadiusTopLeft: '5vmin',
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
                    backgroundColor: 'rgba(159, 237, 215, 0.1)',
                    borderRadius: '5vmin',
                    height: '40px'
                },
                input: {
                    height: '40px',
                    padding: '0 15px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5vmin',
                    height: '40px'
                }
            }
        },
    }
});
