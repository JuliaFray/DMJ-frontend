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
});
