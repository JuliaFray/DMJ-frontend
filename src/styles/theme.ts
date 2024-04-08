import {createTheme} from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#373a3c'
        },
        success: {
            main: '#8cc476'
        },
        warning: {
            main: '#fade90'
        },
        error: {
            main: '#f5a29d'
        },
        info: {
            main: '#fff'
        }
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
});
