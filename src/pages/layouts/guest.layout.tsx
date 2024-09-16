import React from "react";
import {AppBar, Box, Container, Grid, Toolbar} from "@mui/material";
import {Outlet} from 'react-router-dom';
import styles from "./layout.module.scss";
import {BrandLink, SignInLink} from "./layout.ui";

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
        <Container maxWidth={'xl'} fixed>
            <Grid container spacing={1} className={styles.main}>
                <Grid item md={3}></Grid>
                <Grid item md={9}>
                    <Outlet/>
                </Grid>
            </Grid>
        </Container>
    </>
}
