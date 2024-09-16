import React from "react"
import {AppBar, Box, Container, Grid, Toolbar} from "@mui/material";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getAuthId} from "shared/model/auth/auth-selectors";
import {MenuWidget} from "widgets/menu-widget/menu-widget.ui";
import styles from "./layout.module.scss";
import {BrandLink, SignOutLink} from "./layout.ui";

export const UserLayout = () => {
    const userId = useSelector(getAuthId);

    return (
        <>
            <Box sx={{flexGrow: 1}} className={styles.header}>
                <AppBar position='static'>
                    <Toolbar className={styles.toolbar}>
                        <BrandLink/>
                        <SignOutLink/>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth={'xl'} fixed>
                <Grid container spacing={1} className={styles.main}>
                    <Grid item md={3} className={styles.left}>
                        <MenuWidget userId={userId}/>
                    </Grid>
                    <Grid item md={9}>
                        <Container fixed maxWidth={'lg'}>
                            <Outlet/>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}



