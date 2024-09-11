import React from "react";
import {AppBar, Box, Toolbar} from "@mui/material";
import {BrandLink, SignInLink} from "pages/layouts/layout.ui";
import {Outlet} from 'react-router-dom';
import styles from "./layout.module.scss";

export const GuestLayout = () => {
    return <>
        <Box sx={{flexGrow: 1}} className={styles.header}>
            <AppBar position='static'>
                <Toolbar className={styles.toolbar}>
                    <BrandLink/>
                    <SignInLink/>
                </Toolbar>
            </AppBar>
        </Box>
        <Outlet/>
    </>
}
